import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconCard',
  props: {
    iconPath: { type: String, default: '' },
    iconSize: { type: Number, default: 22 },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    variant: { type: String, default: 'accent' },
  },
})
