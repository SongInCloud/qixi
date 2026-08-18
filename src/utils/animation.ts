import { gsap } from 'gsap'

export interface FadeOptions {
  duration?: number
  delay?: number
  y?: number
}

// 慢、轻、柔和的淡入（PRD §8 动画规范）
export function fadeIn(el: Element | null, options: FadeOptions = {}) {
  if (!el) return
  return gsap.fromTo(
    el,
    { opacity: 0, y: options.y ?? 14 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 1.2,
      delay: options.delay ?? 0,
      ease: 'power2.out',
    },
  )
}

export function fadeOut(el: Element | null, options: FadeOptions = {}) {
  if (!el) return
  return gsap.to(el, {
    opacity: 0,
    y: options.y ?? -10,
    duration: options.duration ?? 0.8,
    ease: 'power2.in',
  })
}

// 卡片/浮层入场：0.96 → 1（PRD §8.2 Scale 规范）
export function scaleIn(el: Element | null, options: FadeOptions = {}) {
  if (!el) return
  return gsap.fromTo(
    el,
    { opacity: 0, scale: 0.96 },
    {
      opacity: 1,
      scale: 1,
      duration: options.duration ?? 0.5,
      delay: options.delay ?? 0,
      ease: 'power2.out',
    },
  )
}
