import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SectionShell',
  props: {
    id: { type: String, default: '' },
    maxWidth: { type: String, default: '1200px' },
    gradient: { type: Boolean, default: false },
    extraBottomPadding: { type: Boolean, default: false },
  },
})
