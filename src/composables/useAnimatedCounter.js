import { ref, onMounted } from 'vue'

export function useAnimatedCounter(targetValue, options = {}) {
  const { duration = 1200, delay = 0, suffix = '' } = options
  const display = ref('0')

  function animate(target) {
    const start = performance.now()
    const startVal = parseFloat(display.value.replace(/[^0-9.-]/g, '')) || 0
    const endVal = typeof target === 'string' ? parseFloat(target.replace(/[^0-9.-]/g, '')) : target

    if (isNaN(endVal)) {
      display.value = target + suffix
      return
    }

    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startVal + (endVal - startVal) * eased

      if (endVal >= 1000) {
        display.value = Math.round(current).toLocaleString() + suffix
      } else if (endVal % 1 !== 0) {
        display.value = current.toFixed(1) + suffix
      } else {
        display.value = Math.round(current) + suffix
      }

      if (progress < 1) requestAnimationFrame(tick)
    }

    setTimeout(() => requestAnimationFrame(tick), delay)
  }

  onMounted(() => {
    const val = typeof targetValue === 'function' ? targetValue() : targetValue
    animate(val)
  })

  return { display }
}
