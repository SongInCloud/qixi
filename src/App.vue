<script setup lang="ts">
import { computed, ref } from 'vue'
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
