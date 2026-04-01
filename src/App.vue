<script setup>
import NavBar from './components/NavBar/NavBar.vue'
import HeroSection from './components/HeroSection/HeroSection.vue'
import ProblemSection from './components/ProblemSection/ProblemSection.vue'
import ResearchSection from './components/ResearchSection/ResearchSection.vue'
import UxStrategySection from './components/UxStrategySection/UxStrategySection.vue'
import MapDashboard from './components/MapDashboard/MapDashboard.vue'
import ImpactSection from './components/ImpactSection/ImpactSection.vue'
import FooterSection from './components/FooterSection/FooterSection.vue'
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <ProblemSection />
    <ResearchSection />
    <UxStrategySection />
    <MapDashboard />
    <ImpactSection />
  </main>
  <FooterSection />
</template>

<style>
html {
  scroll-padding-top: 64px;
}

.mapboxgl-popup-content {
  background: rgba(11, 29, 15, 0.95) !important;
  border: 1px solid rgba(34, 197, 94, 0.2) !important;
  border-radius: 12px !important;
  padding: 16px !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4) !important;
  color: #f0fdf4 !important;
}

.mapboxgl-popup-tip {
  border-top-color: rgba(11, 29, 15, 0.95) !important;
}

/* Popup content (used by useMap.js buildPopupHTML) */
.popup-body {
  font-family: var(--font-sans);
  padding: 4px 0;
}

.popup-label {
  font-size: 11px;
  color: rgba(134, 239, 172, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
}

.popup-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.popup-value {
  font-size: 18px;
  font-weight: 700;
  color: #f0fdf4;
  font-family: var(--font-mono);
}

.popup-value--danger {
  color: #EF4444;
}

.popup-unit {
  font-size: 11px;
  color: rgba(134, 239, 172, 0.5);
}

.popup-meta {
  margin-top: 6px;
  font-size: 11px;
  color: rgba(134, 239, 172, 0.4);
}
</style>
