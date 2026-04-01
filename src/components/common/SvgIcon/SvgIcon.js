import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    path: { type: String, required: true },
    size: { type: Number, default: 22 },
    strokeWidth: { type: Number, default: 1.5 },
  },
})
