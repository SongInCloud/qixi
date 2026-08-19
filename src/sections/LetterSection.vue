<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { fadeIn } from '@/utils/animation'
import { letter } from '@/mock/letter'
import Letter from '@/components/Letter.vue'

type Stage = 'letter' | 'ending' | 'gone'

const stage = ref<Stage>('letter')
const moonRef = ref<HTMLElement | null>(null)
const endingFirstRef = ref<HTMLParagraphElement | null>(null)
const endingFinalRef = ref<HTMLElement | null>(null)

const timers: number[] = []

onMounted(() => {
  fadeIn(moonRef.value, { delay: 0.4, duration: 1.6 })
})

// 结束状态序列（REQ-ENDING-01）：
// 祝福语 → 七夕快乐 → 最后只剩星河
function finishReading() {
  stage.value = 'ending'
  void nextTick(() => {
    fadeIn(endingFirstRef.value, { duration: 1 })

    timers.push(
      window.setTimeout(() => {
        fadeIn(endingFinalRef.value, { duration: 1.2, delay: 0.2 })
      }, 2600),
    )

    timers.push(
      window.setTimeout(() => {
        const targets = [endingFirstRef.value, endingFinalRef.value].filter(
          (el): el is HTMLElement => el !== null,
        )
        if (targets.length) {
          gsap.to(targets, { opacity: 0, y: -10, duration: 1.4, ease: 'power2.inOut' })
        }
        timers.push(
          window.setTimeout(() => {
            stage.value = 'gone'
          }, 1500),
        )
      }, 6800),
    )
  })
}

onBeforeUnmount(() => {
  timers.forEach((id) => window.clearTimeout(id))
})
</script>

<template>
  <section class="section letter">
    <div ref="moonRef" class="letter__moon" aria-hidden="true" />
    <div class="letter__vignette" aria-hidden="true" />

    <Transition name="fade">
      <Letter v-if="stage === 'letter'" :letter="letter" @read="finishReading" />
      <div v-else-if="stage === 'ending'" class="letter__ending" aria-live="polite">
        <p ref="endingFirstRef" class="letter__ending-first serif">
          七月初七。<br />
          愿你岁岁欢愉。<br />
          所愿皆有所成。
        </p>
        <h2 ref="endingFinalRef" class="letter__ending-final serif">七夕快乐。</h2>
      </div>
    </Transition>
  </section>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.section.letter {
  gap: 0;
}

.letter__moon {
  position: absolute;
  top: 12%;
  right: 13%;
  z-index: 1;
  width: clamp(70px, 12vw, 120px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(
    circle at 38% 35%,
    #f5efdf,
    #e7ddc6 55%,
    rgba(231, 221, 198, 0.25) 78%,
    transparent 82%
  );
  box-shadow:
    0 0 60px rgba(233, 227, 213, 0.28),
    0 0 120px rgba(233, 227, 213, 0.12);
}

.letter__vignette {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(ellipse at center, transparent 45%, rgba(8, 10, 24, 0.5) 100%);
  pointer-events: none;
}

.letter__ending {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  text-align: center;
}

.letter__ending-first {
  font-size: clamp(1.15rem, 2.6vw, 1.5rem);
  line-height: 2.3;
  letter-spacing: 0.18em;
  text-indent: 0.18em;
  color: $color-text-moon;
}

.letter__ending-final {
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: 0.3em;
  text-indent: 0.3em;
  color: $color-gold-light;
  text-shadow: 0 0 40px rgba(227, 201, 139, 0.35);
}
</style>
