import { defineComponent, ref, watch, onUnmounted } from 'vue'
import { CONTENT } from '@/data/content'
import { useForestStore } from '@/stores/forestStore'
import { useMap } from '@/composables/useMap'
import { formatArea, threatColor } from '@/utils/formatters'
import { debounce } from '@/utils/debounce'
import RegionPanel from '../RegionPanel/RegionPanel.vue'
import TimelineChart from '../TimelineChart/TimelineChart.vue'

export default defineComponent({
  name: 'MapDashboard',
  components: { RegionPanel, TimelineChart },
  setup() {
    const store = useForestStore()
    const mapContainer = ref(null)
    const { isLoaded, resetView } = useMap(mapContainer, store)
    const searchInput = ref('')
    const t = CONTENT.dashboard

    const debouncedSearch = debounce((val) => store.setSearch(val), 250)
    watch(searchInput, (val) => debouncedSearch(val))
    onUnmounted(() => debouncedSearch.cancel())

    function handleRegionClick(region) {
      store.selectRegion(region.id)
    }

    function handleReset() {
      resetView()
      store.clearSelection()
    }

    return {
      store, mapContainer, isLoaded, searchInput,
      handleRegionClick, handleReset,
      formatArea, threatColor, t,
    }
  },
})
