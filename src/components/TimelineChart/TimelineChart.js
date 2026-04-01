import { defineComponent, ref, onMounted, computed } from 'vue'
import { CONTENT } from '@/data/content'
import { TIMELINE_DATA } from '@/data/forestData'

export default defineComponent({
  name: 'TimelineChart',
  setup() {
    const svgRef = ref(null)
    const hoveredIndex = ref(null)
    const animate = ref(false)
    const t = CONTENT.timelineChart

    const padding = { top: 40, right: 40, bottom: 60, left: 70 }
    const width = 900
    const height = 500

    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    const maxVal = computed(() => Math.max(...TIMELINE_DATA.map((d) => d.globalLoss)) * 1.1)
    const xScale = (i) => padding.left + (i / (TIMELINE_DATA.length - 1)) * chartWidth
    const yScale = (v) => padding.top + chartHeight - (v / maxVal.value) * chartHeight

    const lossPath = computed(() => {
      return TIMELINE_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d.globalLoss)}`).join(' ')
    })

    const gainPath = computed(() => {
      return TIMELINE_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d.globalGain)}`).join(' ')
    })

    const netPath = computed(() => {
      return TIMELINE_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d.netLoss)}`).join(' ')
    })

    const lossAreaPath = computed(() => {
      return `${lossPath.value} L${xScale(TIMELINE_DATA.length - 1)},${padding.top + chartHeight} L${xScale(0)},${padding.top + chartHeight} Z`
    })

    const yTicks = computed(() => {
      const step = Math.ceil(maxVal.value / 5 / 1000) * 1000
      const ticks = []
      for (let v = 0; v <= maxVal.value; v += step) ticks.push(v)
      return ticks
    })

    onMounted(() => {
      setTimeout(() => { animate.value = true }, 200)
    })

    return {
      svgRef, hoveredIndex, animate,
      padding, width, height, chartWidth, chartHeight,
      xScale, yScale,
      lossPath, gainPath, netPath, lossAreaPath, yTicks,
      TIMELINE_DATA, t,
    }
  },
})
