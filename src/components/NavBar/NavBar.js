import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { CONTENT } from '@/data/content'
import AppLogo from '../common/AppLogo/AppLogo.vue'

export default defineComponent({
  name: 'NavBar',
  components: { AppLogo },
  setup() {
    const scrolled = ref(false)
    const mobileOpen = ref(false)
    const { app, nav } = CONTENT

    function onScroll() {
      scrolled.value = window.scrollY > 40
    }

    function scrollTo(id) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      mobileOpen.value = false
    }

    onMounted(() => window.addEventListener('scroll', onScroll))
    onUnmounted(() => window.removeEventListener('scroll', onScroll))

    return { scrolled, mobileOpen, sections: nav.sections, scrollTo, app, nav }
  },
})
