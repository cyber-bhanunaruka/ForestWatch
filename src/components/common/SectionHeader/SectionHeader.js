import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SectionHeader',
  props: {
    label: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
  },
})
