import { defineComponent, ref, onMounted } from 'vue'
import { CONTENT } from '@/data/content'

export default defineComponent({
  name: 'HeroSection',
  setup() {
    const visible = ref(false)
    const t = CONTENT.hero

    onMounted(() => {
      setTimeout(() => { visible.value = true }, 100)
    })

    function scrollToSection(id = 'problem') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return { visible, scrollToSection, t }
  },
})
