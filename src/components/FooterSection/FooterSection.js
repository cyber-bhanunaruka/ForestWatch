import { defineComponent } from 'vue'
import { CONTENT } from '@/data/content'
import AppLogo from '../common/AppLogo/AppLogo.vue'

export default defineComponent({
  name: 'FooterSection',
  components: { AppLogo },
  setup() {
    const year = new Date().getFullYear()
    const { footer } = CONTENT

    return { year, t: footer }
  },
})
