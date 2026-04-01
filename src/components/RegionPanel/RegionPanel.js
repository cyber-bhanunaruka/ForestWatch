import { defineComponent, computed } from 'vue'
import { CONTENT } from '@/data/content'
import { formatArea, percentRemaining, threatColor } from '@/utils/formatters'

export default defineComponent({
  name: 'RegionPanel',
  props: {
    region: { type: Object, required: true },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const coverPercent = computed(() => percentRemaining(props.region.totalArea, props.region.remainingArea))
    const barWidth = computed(() => `${coverPercent.value}%`)
    const t = CONTENT.regionPanel

    function handleClose() {
      emit('close')
    }

    return { coverPercent, barWidth, formatArea, threatColor, handleClose, t }
  },
})
