import { defineComponent } from 'vue'
import { CONTENT } from '@/data/content'
import { CASE_STUDY } from '@/data/forestData'
import SectionShell from '../common/SectionShell/SectionShell.vue'
import SectionHeader from '../common/SectionHeader/SectionHeader.vue'

export default defineComponent({
  name: 'ImpactSection',
  components: { SectionShell, SectionHeader },
  setup() {
    return {
      impact: CASE_STUDY.impact,
      t: CONTENT.impact,
    }
  },
})
