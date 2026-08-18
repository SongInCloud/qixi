<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'

interface Star {
  x: number
  y: number
  radius: number
  baseAlpha: number
  twinkleSpeed: number
  phase: number
  color: string
  glow: boolean
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let stars: Star[] = []
let width = 0
let height = 0
let dpr = 1
let rafId = 0

function buildStars() {
  // 星星数量 100～180（PRD §14）
  const count = Math.min(180, Math.max(90, Math.round((width * height) / 9000)))
  stars = Array.from({ length: count }, () => {
    const glow = Math.random() < 0.08
    const gold = Math.random() < 0.12
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: glow ? Math.random() * 1.6 + 0.8 : Math.random() * 1.1 + 0.3,
      baseAlpha: Math.random() * 0.55 + 0.12,
      twinkleSpeed: Math.random() * 0.8 + 0.15,
      phase: Math.random() * Math.PI * 2,
      color: gold ? '#e3c98b' : '#e9e3d5',
      glow,
    }
  })
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  width = canvas.clientWidth
  height = canvas.clientHeight
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx = canvas.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  buildStars()
}

function draw(time: number) {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)
  const t = time / 1000

  for (const star of stars) {
    const alpha = star.baseAlpha * (0.55 + 0.45 * Math.sin(t * star.twinkleSpeed + star.phase))
    ctx.globalAlpha = Math.max(0, alpha)
    ctx.fillStyle = star.color
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
    ctx.fill()

    if (star.glow) {
      const gradient = ctx.createRadialGradient(
        star.x,
        star.y,
        0,
        star.x,
        star.y,
        star.radius * 5,
      )
      gradient.addColorStop(0, star.color)
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.globalAlpha = Math.max(0, alpha * 0.35)
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.radius * 5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  ctx.globalAlpha = 1
  rafId = requestAnimationFrame(draw)
}

onMounted(() => {
  resize()
  rafId = requestAnimationFrame(draw)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
})

useResizeObserver(canvasRef, resize)
</script>

<template>
  <canvas ref="canvasRef" class="star-field" aria-hidden="true" />
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.star-field {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
