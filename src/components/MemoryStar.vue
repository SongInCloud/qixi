<script setup lang="ts">
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import type { Memory, MemoryPosition } from '@/types'

const props = defineProps<{
  memory: Memory
  active?: boolean
}>()

const emit = defineEmits<{ open: [] }>()

const isMobile = useMediaQuery('(max-width: 767px)')

// 移动端可独立定位（PRD REQ-STARRIVER-05）
const position = computed<MemoryPosition>(() => {
  const p = props.memory.position
  if ('desktop' in p && 'mobile' in p) {
    return isMobile.value ? p.mobile : p.desktop
  }
  return p
})

const sizeClass = computed(() => `memory-star--${props.memory.size ?? 'medium'}`)
const colorClass = computed(() => `memory-star--${props.memory.color ?? 'white'}`)

const style = computed(() => ({
  left: `${position.value.x}%`,
  top: `${position.value.y}%`,
}))
</script>

<template>
  <button
    type="button"
    class="memory-star"
    :class="[
      sizeClass,
      colorClass,
      { 'memory-star--featured': memory.featured, 'memory-star--active': active },
    ]"
    :style="style"
    :aria-label="memory.title"
    @click="emit('open')"
  >
    <span class="memory-star__dot" aria-hidden="true" />
    <!-- <span class="memory-star__label serif">✦ {{ memory.title }}</span> -->
  </button>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.memory-star {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 1;
  transition: transform 0.5s ease;

  &:hover,
  &:focus-visible {
    transform: translate(-50%, -50%) scale(1.35);

    .memory-star__dot {
      box-shadow:
        0 0 8px currentColor,
        0 0 20px currentColor;
    }

    .memory-star__label {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
}

.memory-star__dot {
  position: relative;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: $color-text-moon;
  color: $color-text-moon;
  box-shadow:
    0 0 6px rgba(233, 227, 213, 0.85),
    0 0 16px rgba(233, 227, 213, 0.35);
  transition:
    box-shadow 0.5s ease,
    background 0.5s ease;
}

.memory-star--featured .memory-star__dot::before {
  content: '';
  position: absolute;
  inset: -9px;
  border: 1px solid currentColor;
  border-radius: 50%;
  opacity: 0;
  animation: memory-star-invitation 2.8s ease-out infinite;
}

.memory-star__label {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translate(-50%, -4px);
  opacity: 0;
  white-space: nowrap;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  color: $color-text-moon;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.8);
  pointer-events: none;
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.memory-star--small .memory-star__dot {
  width: 6px;
  height: 6px;
}

.memory-star--large .memory-star__dot {
  width: 13px;
  height: 13px;
}

.memory-star--gold .memory-star__dot {
  background: $color-gold-light;
  color: $color-gold-light;
  box-shadow:
    0 0 8px rgba(227, 201, 139, 0.9),
    0 0 20px rgba(227, 201, 139, 0.4);
}

.memory-star--featured .memory-star__dot {
  animation: memory-star-pulse 3.2s ease-in-out infinite;
}

.memory-star--active {
  transform: translate(-50%, -50%) scale(1.5);

  .memory-star__dot {
    box-shadow:
      0 0 10px currentColor,
      0 0 28px currentColor;
  }
}

@keyframes memory-star-pulse {
  0%,
  100% {
    box-shadow:
      0 0 6px currentColor,
      0 0 14px currentColor;
  }
  50% {
    box-shadow:
      0 0 12px currentColor,
      0 0 30px currentColor;
  }
}

@keyframes memory-star-invitation {
  0% {
    transform: scale(0.55);
    opacity: 0;
  }
  25% {
    opacity: 0.42;
  }
  75%,
  100% {
    transform: scale(1.45);
    opacity: 0;
  }
}

@media (hover: none), (pointer: coarse) {
  .memory-star--featured .memory-star__label {
    opacity: 0.9;
    transform: translate(-50%, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .memory-star--featured .memory-star__dot,
  .memory-star--featured .memory-star__dot::before {
    animation: none;
  }
}
</style>
