export function formatNumber(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toString()
}

export function formatArea(km2) {
  if (km2 >= 1_000_000) return `${(km2 / 1_000_000).toFixed(2)}M km\u00B2`
  if (km2 >= 1_000) return `${(km2 / 1_000).toFixed(0)}K km\u00B2`
  return `${km2.toLocaleString()} km\u00B2`
}

export function formatPercent(value) {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
}

export function percentRemaining(total, remaining) {
  if (!total || total <= 0) return '0.0'
  return ((remaining / total) * 100).toFixed(1)
}

import { THREAT_COLORS } from '@/data/forestData'

export function threatColor(level) {
  return THREAT_COLORS[level] || '#6B7280'
}

export function lerp(a, b, t) {
  return a + (b - a) * t
}
