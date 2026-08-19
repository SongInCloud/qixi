<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronLeft } from 'lucide-vue-next'
import { useEventListener } from '@vueuse/core'
import StarField from '@/components/StarField.vue'
import IntroSection from '@/sections/IntroSection.vue'
import DaughterFestivalSection from '@/sections/DaughterFestivalSection.vue'
import StarRiverSection from '@/sections/StarRiverSection.vue'
import QiqiaoSection from '@/sections/QiqiaoSection.vue'
import LetterSection from '@/sections/LetterSection.vue'

const sections = [
  IntroSection,
  DaughterFestivalSection,
  StarRiverSection,
  QiqiaoSection,
  LetterSection,
]

const current = ref(0)
const currentSection = computed(() => sections[current.value])

function goNext() {
  if (current.value < sections.length - 1) current.value += 1
}

function goPrevious() {
  if (current.value > 0) current.value -= 1
}

useEventListener(window, 'keydown', (event: KeyboardEvent) => {
  const target = event.target as HTMLElement | null
  const isEditing =
    target?.matches('input, textarea, [contenteditable="true"]') ?? false
  const dialogOpen = Boolean(document.querySelector('[role="dialog"]'))

  if (event.key === 'ArrowLeft' && !isEditing && !dialogOpen) goPrevious()
})

function pad(n: number) {
  return String(n).padStart(2, '0')
}
</script>

<template>
  <div class="app">
    <StarField class="app__stars" />

    <!-- 轻量章节提示（PRD REQ-NAV-01） -->
    <header class="app__chapter">
      <span class="app__chapter-index">{{ pad(current + 1) }} / {{ pad(sections.length) }}</span>
      <span class="app__chapter-name">七月初七</span>
    </header>

    <Transition name="back-nav">
      <button
        v-if="current > 0"
        type="button"
        class="app__back"
        aria-label="返回上一章"
        @click="goPrevious"
      >
        <ChevronLeft :size="16" aria-hidden="true" />
        <span>上一章</span>
      </button>
    </Transition>

    <!-- 全屏章节切换（PRD REQ-NAV-02） -->
    <Transition name="section" mode="out-in">
      <component :is="currentSection" :key="current" @next="goNext" />
    </Transition>
  </div>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-bg-night;
}

.app__stars {
  z-index: $z-starfield;
}

.app__chapter {
  position: fixed;
  top: 0;
  right: 0;
  z-index: $z-chapter;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 22px 26px;
  font-size: 0.7rem;
  letter-spacing: 0.32em;
  text-indent: 0.32em;
  color: $color-text-secondary;
  pointer-events: none;
}

.app__chapter-name {
  color: $color-gold;
}

.app__back {
  position: fixed;
  top: 18px;
  left: 20px;
  z-index: $z-chapter;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 10px 7px 7px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: rgba(8, 10, 24, 0.42);
  color: $color-text-secondary;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  cursor: pointer;
  transition:
    color 0.35s ease,
    border-color 0.35s ease,
    background 0.35s ease;

  &:hover,
  &:focus-visible {
    color: $color-gold-light;
    border-color: rgba(201, 168, 106, 0.32);
    background: rgba(16, 22, 44, 0.82);
  }
}

.back-nav-enter-active,
.back-nav-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.back-nav-enter-from,
.back-nav-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

@media (max-width: 360px) {
  .app__chapter {
    padding-right: 16px;
  }

  .app__chapter-name {
    display: none;
  }

  .app__back {
    left: 12px;
  }
}

.section-enter-active,
.section-leave-active {
  transition:
    opacity 0.9s ease,
    transform 0.9s ease,
    filter 0.9s ease;
}

.section-enter-from {
  opacity: 0;
  transform: translateY(16px);
  filter: blur(6px);
}

.section-leave-to {
  opacity: 0;
  transform: translateY(-16px);
  filter: blur(6px);
}
</style>
