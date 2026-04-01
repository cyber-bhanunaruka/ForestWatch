import { defineComponent } from 'vue'
import { CONTENT } from '@/data/content'
import { CASE_STUDY } from '@/data/forestData'
import { ICONS } from '@/data/icons'
import SectionShell from '../common/SectionShell/SectionShell.vue'
import SectionHeader from '../common/SectionHeader/SectionHeader.vue'
import IconCard from '../common/IconCard/IconCard.vue'

export default defineComponent({
  name: 'UxStrategySection',
  components: { SectionShell, SectionHeader, IconCard },
  setup() {
    return {
      uxStrategy: CASE_STUDY.uxStrategy,
      ICONS,
      t: CONTENT.uxStrategy,
    }
  },
})
