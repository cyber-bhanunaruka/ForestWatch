import { ref, shallowRef, onMounted, onUnmounted, watch } from 'vue'
import mapboxgl from 'mapbox-gl'
import { DEFORESTATION_POINTS, FOREST_REGIONS } from '@/data/forestData'

function buildPopupHTML(props) {
  const severity = (props.intensity * 100).toFixed(0)
  return `
    <div class="popup-body">
      <div class="popup-label">Deforestation Event</div>
      <div class="popup-grid">
        <div><span class="popup-value">${props.area}</span><span class="popup-unit"> km\u00B2</span></div>
        <div><span class="popup-value popup-value--danger">${severity}%</span><span class="popup-unit"> severity</span></div>
      </div>
      <div class="popup-meta">Year: ${props.year}</div>
    </div>`
}

export function useMap(containerRef, store) {
  const map = shallowRef(null)
  const isLoaded = ref(false)
  const popup = shallowRef(null)

  function initMap() {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || ''

    const instance = new mapboxgl.Map({
      container: containerRef.value,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [15, 10],
      zoom: 2.2,
      pitch: 0,
      bearing: 0,
      projection: 'globe',
      antialias: true,
      attributionControl: false,
    })

    instance.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'top-right')
    instance.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }), 'bottom-right')

    instance.on('style.load', () => {
      instance.setFog({
        color: 'rgb(10, 20, 12)',
        'high-color': 'rgb(20, 40, 25)',
        'horizon-blend': 0.04,
        'space-color': 'rgb(5, 10, 8)',
        'star-intensity': 0.6,
      })
    })

    instance.on('load', () => {
      addClusteredDeforestationLayer(instance)
      addRegionLayer(instance)
      isLoaded.value = true
    })

    map.value = instance
  }

  // --- Clustered deforestation points ---
  function addClusteredDeforestationLayer(m) {
    const geojson = {
      type: 'FeatureCollection',
      features: DEFORESTATION_POINTS.map((pt) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [pt.lng, pt.lat] },
        properties: { intensity: pt.intensity, area: pt.area, year: pt.year, region: pt.region },
      })),
    }

    m.addSource('deforestation', {
      type: 'geojson',
      data: geojson,
      cluster: true,
      clusterMaxZoom: 10,
      clusterRadius: 50,
      clusterProperties: {
        totalArea: ['+', ['get', 'area']],
        maxIntensity: ['max', ['get', 'intensity']],
      },
    })

    // Heatmap (visible at low zoom, fades at high zoom)
    m.addLayer({
      id: 'deforestation-heat',
      type: 'heatmap',
      source: 'deforestation',
      maxzoom: 10,
      filter: ['!', ['has', 'point_count']],
      paint: {
        'heatmap-weight': ['interpolate', ['linear'], ['get', 'intensity'], 0, 0, 1, 1],
        'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 10, 3],
        'heatmap-color': [
          'interpolate', ['linear'], ['heatmap-density'],
          0, 'rgba(0,0,0,0)',
          0.1, 'rgba(34,197,94,0.2)',
          0.3, 'rgba(234,179,8,0.4)',
          0.5, 'rgba(249,115,22,0.6)',
          0.7, 'rgba(239,68,68,0.8)',
          1, 'rgba(220,38,38,1)',
        ],
        'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 15, 10, 40],
        'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 5, 0.8, 10, 0.3],
      },
    })

    // Cluster circles
    m.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'deforestation',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step', ['get', 'point_count'],
          '#22C55E', 5,
          '#EAB308', 10,
          '#F97316', 20,
          '#EF4444',
        ],
        'circle-radius': ['step', ['get', 'point_count'], 18, 5, 24, 10, 30, 20, 36],
        'circle-stroke-width': 3,
        'circle-stroke-color': 'rgba(255,255,255,0.15)',
        'circle-opacity': 0.85,
      },
    })

    // Cluster count labels
    m.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'deforestation',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
        'text-size': 13,
      },
      paint: {
        'text-color': '#ffffff',
      },
    })

    // Unclustered individual points
    m.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'deforestation',
      filter: ['!', ['has', 'point_count']],
      minzoom: 5,
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['get', 'area'], 50, 5, 450, 14],
        'circle-color': [
          'interpolate', ['linear'], ['get', 'intensity'],
          0.3, '#22C55E', 0.6, '#EAB308', 0.8, '#F97316', 1.0, '#EF4444',
        ],
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 1.5,
        'circle-opacity': 0.9,
      },
    })

    m.on('click', 'clusters', (e) => {
      const features = m.queryRenderedFeatures(e.point, { layers: ['clusters'] })
      if (!features.length) return
      const clusterId = features[0].properties.cluster_id
      m.getSource('deforestation').getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return
        m.flyTo({ center: features[0].geometry.coordinates, zoom, duration: 1200 })
      })
    })

    m.on('click', 'unclustered-point', (e) => {
      if (!e.features?.length) return
      const props = e.features[0].properties
      const coords = e.features[0].geometry.coordinates.slice()
      if (popup.value) popup.value.remove()
      popup.value = new mapboxgl.Popup({ className: 'forest-popup', offset: 12, closeButton: false })
        .setLngLat(coords)
        .setHTML(buildPopupHTML(props))
        .addTo(m)
    })

    // Cursor states
    m.on('mouseenter', 'clusters', () => { m.getCanvas().style.cursor = 'pointer' })
    m.on('mouseleave', 'clusters', () => { m.getCanvas().style.cursor = '' })
    m.on('mouseenter', 'unclustered-point', () => { m.getCanvas().style.cursor = 'pointer' })
    m.on('mouseleave', 'unclustered-point', () => { m.getCanvas().style.cursor = '' })
  }

  // --- Region markers with GeoJSON ---
  function addRegionLayer(m) {
    const regionGeoJSON = {
      type: 'FeatureCollection',
      features: FOREST_REGIONS.map((r) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: r.center },
        properties: { id: r.id, name: r.name, country: r.country, threatLevel: r.threatLevel, annualLoss: r.annualLoss },
      })),
    }

    m.addSource('regions', { type: 'geojson', data: regionGeoJSON })

    // Pulsing outer ring
    m.addLayer({
      id: 'region-pulse',
      type: 'circle',
      source: 'regions',
      paint: {
        'circle-radius': 16,
        'circle-color': 'transparent',
        'circle-stroke-width': 2,
        'circle-stroke-color': [
          'match', ['get', 'threatLevel'],
          'critical', 'rgba(239,68,68,0.3)',
          'high', 'rgba(249,115,22,0.3)',
          'moderate', 'rgba(234,179,8,0.3)',
          'low', 'rgba(34,197,94,0.3)',
          'rgba(107,114,128,0.3)',
        ],
      },
    })

    // Inner dot
    m.addLayer({
      id: 'region-dots',
      type: 'circle',
      source: 'regions',
      paint: {
        'circle-radius': 7,
        'circle-color': [
          'match', ['get', 'threatLevel'],
          'critical', '#EF4444', 'high', '#F97316', 'moderate', '#EAB308', 'low', '#22C55E', '#6B7280',
        ],
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 2,
      },
    })

    // Labels
    m.addLayer({
      id: 'region-labels',
      type: 'symbol',
      source: 'regions',
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
        'text-size': 12,
        'text-offset': [0, 2],
        'text-anchor': 'top',
        'text-optional': true,
      },
      paint: {
        'text-color': '#ffffff',
        'text-halo-color': 'rgba(0,0,0,0.85)',
        'text-halo-width': 1.5,
      },
    })

    m.on('click', 'region-dots', (e) => {
      if (!e.features?.length) return
      const id = e.features[0].properties.id
      const region = FOREST_REGIONS.find((r) => r.id === id)
      if (region && store) {
        store.selectRegion(region.id)
        flyToRegion(region)
      }
    })

    m.on('mouseenter', 'region-dots', () => { m.getCanvas().style.cursor = 'pointer' })
    m.on('mouseleave', 'region-dots', () => { m.getCanvas().style.cursor = '' })
  }

  function flyToRegion(region) {
    if (!map.value) return
    if (popup.value) popup.value.remove()
    map.value.flyTo({
      center: region.center,
      zoom: region.zoom,
      pitch: 45,
      bearing: -17,
      duration: 2400,
      essential: true,
      curve: 1.42,
    })
  }

  function resetView() {
    if (!map.value) return
    if (popup.value) popup.value.remove()
    if (store) store.clearSelection()
    map.value.flyTo({
      center: [15, 10],
      zoom: 2.2,
      pitch: 0,
      bearing: 0,
      duration: 2000,
      essential: true,
    })
  }

  // React to Pinia store region changes
  if (store) {
    watch(
      () => store.activeRegionId,
      (id) => {
        if (id) {
          const region = FOREST_REGIONS.find((r) => r.id === id)
          if (region) flyToRegion(region)
        }
      }
    )
  }

  onMounted(() => {
    if (containerRef.value) initMap()
  })

  onUnmounted(() => {
    if (popup.value) popup.value.remove()
    if (map.value) map.value.remove()
  })

  return { map, isLoaded, flyToRegion, resetView }
}
