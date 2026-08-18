<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import type { Letter as LetterData } from '@/types'

const props = defineProps<{
  letter: LetterData
}>()

const emit = defineEmits<{ read: [] }>()

const paperRef = ref<HTMLElement | null>(null)
const greetingRef = ref<HTMLParagraphElement | null>(null)
const paragraphRefs = ref<(HTMLParagraphElement | null)[]>([])
const endingRef = ref<HTMLParagraphElement | null>(null)

const revealed = ref(false)

function setParagraphRef(index: number) {
  return (el: unknown) => {
    paragraphRefs.value[index] = (el as HTMLParagraphElement | null) ?? null
  }
}

// 信笺展开 + 段落依次浮现（REQ-LETTER-03 / PRD §8 动画规范）
onMounted(() => {
  const paperEl = paperRef.value
  if (!paperEl) {
    revealed.value = true
    return
  }

  const targets = [greetingRef.value, ...paragraphRefs.value, endingRef.value].filter(
    (el): el is HTMLParagraphElement => el !== null,
  )

  const timeline = gsap.timeline({
    onComplete: () => {
      revealed.value = true
    },
  })

  timeline.fromTo(
    paperEl,
    { opacity: 0, scale: 0.96, y: 14 },
    { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out' },
    0.2,
  )

  if (targets.length) {
    timeline.fromTo(
      targets,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.5, ease: 'power2.out' },
      '+=0.25',
    )
  }
})

function read() {
  if (!revealed.value) return
  emit('read')
}
</script>

<template>
  <div class="letter-paper">
    <div class="letter-paper__seal" aria-hidden="true">七夕</div>
    <h2 class="letter-paper__title serif">{{ letter.title }}</h2>
    <p ref="greetingRef" class="letter-paper__greeting">{{ letter.greeting }}</p>
    <p
      v-for="(paragraph, index) in letter.paragraphs"
      :key="index"
      :ref="setParagraphRef(index)"
      class="letter-paper__paragraph"
    >
      {{ paragraph }}
    </p>
    <p ref="endingRef" class="letter-paper__ending serif">{{ letter.ending }}</p>

    <button
      type="button"
      class="letter-paper__read btn-text"
      :class="{ 'letter-paper__read--visible': revealed }"
      :tabindex="revealed ? 0 : -1"
      :aria-hidden="!revealed"
      @click="read"
    >
      读完了
    </button>
  </div>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.letter-paper {
  position: relative;
  z-index: 2;
  width: min(620px, calc(100vw - 40px));
  max-height: 82vh;
  overflow-y: auto;
  padding: 48px 48px 34px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.4), transparent 10%),
    linear-gradient(160deg, #f0e8d5, #e5dac0);
  color: #423a28;
  border-radius: 2px;
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.55),
    inset 0 0 48px rgba(122, 100, 58, 0.1);
  text-align: left;
}

.letter-paper__seal {
  position: absolute;
  top: 20px;
  right: 22px;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-cinnabar;
  color: #f3ead6;
  font-family: $font-serif;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  writing-mode: vertical-rl;
  border-radius: 3px;
  box-shadow: 0 4px 12px rgba(184, 74, 66, 0.35);
  transform: rotate(3deg);
}

.letter-paper__title {
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  letter-spacing: 0.26em;
  text-indent: 0.26em;
  text-align: center;
  color: #5b4a2b;
  margin-bottom: 30px;
}

.letter-paper__greeting {
  font-size: 1rem;
  margin-bottom: 18px;
  color: #4a402a;
}

.letter-paper__paragraph {
  margin-bottom: 16px;
  font-size: 0.95rem;
  line-height: 2.2;
  color: #4d442e;
  letter-spacing: 0.04em;
}

.letter-paper__ending {
  margin-top: 26px;
  text-align: right;
  font-size: 1.05rem;
  color: #5b4a2b;
  letter-spacing: 0.14em;
}

.letter-paper__read {
  display: block;
  margin: 28px auto 0;
  color: #5b4a2b;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.6s ease;

  &::after {
    background: #8a6d3b;
  }

  &:hover,
  &:focus-visible {
    color: #8a6d3b;
  }

  &--visible {
    opacity: 1;
    pointer-events: auto;
  }
}

@media (max-width: 767px) {
  .letter-paper {
    padding: 34px 24px 28px;
  }

  .letter-paper__seal {
    top: 14px;
    right: 16px;
    width: 40px;
    height: 40px;
    font-size: 0.85rem;
  }

  .letter-paper__title {
    margin-bottom: 22px;
  }
}
</style>
