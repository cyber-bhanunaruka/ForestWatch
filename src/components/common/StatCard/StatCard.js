import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StatCard',
  props: {
    value: { type: String, required: true },
    label: { type: String, required: true },
    iconPath: { type: String, default: '' },
  },
})
