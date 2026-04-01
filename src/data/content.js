export const CONTENT = {
  app: {
    name: 'ForestWatch',
    brandFirst: 'Forest',
    brandAccent: 'Watch',
  },

  nav: {
    sections: [
      { id: 'problem', label: 'Problem' },
      { id: 'research', label: 'Research' },
      { id: 'ux-strategy', label: 'UX Strategy' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'impact', label: 'Impact' },
    ],
    badge: 'Case Study',
    toggleMenuAria: 'Toggle menu',
  },

  hero: {
    eyebrow: 'UX Case Study — Forest Conservation Platform',
    title: "Mapping the world\u2019s forests",
    titleAccent: 'before they disappear',
    subtitle:
      'A FAANG-level case study exploring how real-time geospatial visualization ' +
      'can transform deforestation monitoring — from fragmented satellite data ' +
      'to actionable conservation intelligence.',
    meta: [
      { label: 'Role', value: 'Lead Product Designer + Engineer' },
      { label: 'Duration', value: '8 months (2024)' },
      { label: 'Stack', value: 'Vue 3, Pinia, Mapbox GL, D3' },
    ],
    ctaPrimary: 'Explore the case study',
    ctaSecondary: 'Jump to dashboard',
  },

  footer: {
    brand: 'ForestWatch',
    copyright: 'ForestWatch Case Study. Built with Vue 3 + Pinia + Mapbox GL JS.',
    links: [
      { id: 'hero', label: 'Top' },
      { id: 'problem', label: 'Problem' },
      { id: 'research', label: 'Research' },
      { id: 'ux-strategy', label: 'UX Strategy' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'impact', label: 'Impact' },
    ],
  },

  dashboard: {
    label: '04 — Interactive Dashboard',
    title: 'Global Forest Monitor',
    subtitle:
      'Explore deforestation hotspots, regional data, and temporal trends. ' +
      'Click a region marker or sidebar item to dive deeper.',
    mapView: 'Map View',
    timeline: 'Timeline',
    searchPlaceholder: 'Search forests, countries...',
    clearSearchAria: 'Clear search',
    allFilter: 'All',
    regionsTitle: 'Regions',
    perYear: '/ year',
    emptyState: 'No regions match your search.',
    resetBtn: 'Reset to global view',
    loader: 'Initializing map engine...',
    legend: {
      title: 'Deforestation Intensity',
      labels: ['Low', 'Moderate', 'Severe', 'Critical'],
    },
  },

  regionPanel: {
    closeAria: 'Close',
    coverTitle: 'Forest Cover Remaining',
    totalAreaLabel: 'Total Area',
    remainingLabel: 'Remaining',
    annualLossLabel: 'Annual Loss',
    trendLabel: 'Trend (YoY)',
    biodiversityLabel: 'Biodiversity Idx',
    carbonStockLabel: 'Carbon Stock',
    carbonUnit: 'Gt',
  },

  timelineChart: {
    title: 'Global Forest Loss & Gain (2000\u20132024)',
    legend: [
      { label: 'Forest Loss', color: '#EF4444' },
      { label: 'Forest Gain', color: '#22C55E' },
      { label: 'Net Loss', color: '#F97316' },
    ],
    axisLabel: 'Area (km\u00B2)',
    tooltipLoss: 'Loss',
    tooltipGain: 'Gain',
    unit: 'K km\u00B2',
  },

  problem: {
    label: '01 — Problem',
    contextTitle: 'Context',
    statementTitle: 'Problem Statement',
    goalsTitle: 'Design Goals',
    painPointsTitle: 'Key Pain Points',
  },

  research: {
    label: '02 — Research',
    usersTitle: 'Target Users',
    painPointsTitle: 'Pain Points',
    personasTitle: 'User Personas',
    painPointTag: 'Pain Point',
    goalTag: 'Goal',
    insightsTitle: 'Key Insights',
  },

  uxStrategy: {
    label: '03 — UX Strategy',
    coreTitle: 'Core Features',
    flowTitle: 'User Flow',
    advancedBadge: 'FAANG-Level',
    advancedTitle: 'Advanced Patterns',
  },

  impact: {
    label: '05 — Impact',
    beforeTag: 'Before',
    afterTag: 'After',
    ctaTitle: 'Built with Purpose',
    ctaDescription:
      'This case study demonstrates how thoughtful product design — grounded in ' +
      'user research and powered by modern geospatial technology — can create ' +
      'tools that genuinely move the needle on environmental conservation.',
    techStack: [
      'Vue 3', 'Pinia', 'Mapbox GL JS', 'D3.js',
      'Composition API', 'GeoJSON', 'Clustering', 'Vite',
    ],
  },
}
