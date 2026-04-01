import { defineComponent } from 'vue'
import { CONTENT } from '@/data/content'
import { CASE_STUDY } from '@/data/forestData'
import { ICONS } from '@/data/icons'
import SectionShell from '../common/SectionShell/SectionShell.vue'
import SectionHeader from '../common/SectionHeader/SectionHeader.vue'
import StatCard from '../common/StatCard/StatCard.vue'
import IconCard from '../common/IconCard/IconCard.vue'

export default defineComponent({
  name: 'ProblemSection',
  components: { SectionShell, SectionHeader, StatCard, IconCard },
  setup() {
    return {
      problem: CASE_STUDY.problem,
      ICONS,
      t: CONTENT.problem,
    }
  },
})
