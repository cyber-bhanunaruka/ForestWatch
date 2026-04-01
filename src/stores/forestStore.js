import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { FOREST_REGIONS } from '@/data/forestData'

export const useForestStore = defineStore('forest', () => {
  const searchQuery = ref('')
  const activeThreatFilter = ref('all')
  const activeRegionId = ref(null)
  const viewMode = ref('map')

  const threatLevels = ['all', 'critical', 'high', 'moderate', 'low']

  const filteredRegions = computed(() => {
    let results = [...FOREST_REGIONS]

    if (activeThreatFilter.value !== 'all') {
      results = results.filter((r) => r.threatLevel === activeThreatFilter.value)
    }

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      results = results.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.country.toLowerCase().includes(q) ||
          r.biome?.toLowerCase().includes(q)
      )
    }

    return results.sort((a, b) => b.annualLoss - a.annualLoss)
  })

  const activeRegion = computed(() =>
    activeRegionId.value ? FOREST_REGIONS.find((r) => r.id === activeRegionId.value) : null
  )

  const totalMonitored = computed(() => FOREST_REGIONS.length)
  const totalFiltered = computed(() => filteredRegions.value.length)

  const globalStats = computed(() => ({
    totalArea: FOREST_REGIONS.reduce((s, r) => s + r.totalArea, 0),
    remainingArea: FOREST_REGIONS.reduce((s, r) => s + r.remainingArea, 0),
    annualLoss: FOREST_REGIONS.reduce((s, r) => s + r.annualLoss, 0),
    avgBiodiversity: +(FOREST_REGIONS.reduce((s, r) => s + r.biodiversityIndex, 0) / FOREST_REGIONS.length).toFixed(2),
    totalCarbon: FOREST_REGIONS.reduce((s, r) => s + r.carbonStock, 0),
  }))

  function setSearch(query) {
    searchQuery.value = query
  }

  function setThreatFilter(level) {
    activeThreatFilter.value = level
  }

  function selectRegion(id) {
    activeRegionId.value = id
  }

  function clearSelection() {
    activeRegionId.value = null
  }

  function setViewMode(mode) {
    viewMode.value = mode
  }

  return {
    searchQuery,
    activeThreatFilter,
    activeRegionId,
    viewMode,
    threatLevels,
    filteredRegions,
    activeRegion,
    totalMonitored,
    totalFiltered,
    globalStats,
    setSearch,
    setThreatFilter,
    selectRegion,
    clearSelection,
    setViewMode,
  }
})
