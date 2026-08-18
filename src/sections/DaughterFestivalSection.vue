<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { X } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { useEventListener } from '@vueuse/core'
import { fadeIn } from '@/utils/animation'
import { daughterCards } from '@/mock/daughter'
import type { DaughterCard } from '@/types'

const emit = defineEmits<{ next: [] }>()

const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLParagraphElement | null>(null)
const leadRef = ref<HTMLParagraphElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)

const expanded = ref<DaughterCard | null>(null)
const overlayCardRef = ref<HTMLElement | null>(null)
const overlayTitleRef = ref<HTMLElement | null>(null)
const overlaySubRef = ref<HTMLElement | null>(null)
const overlayContentRef = ref<HTMLParagraphElement | null>(null)

onMounted(() => {
  fadeIn(titleRef.value, { delay: 0.1 })
  fadeIn(subtitleRef.value, { delay: 0.5 })
  fadeIn(leadRef.value, { delay: 0.9 })
  fadeIn(cardsRef.value, { delay: 1.3 })
  fadeIn(buttonRef.value, { delay: 1.8 })
})

// ESC 关闭展开卡片（REQ-DAUGHTER-05）
useEventListener(window, 'keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape' && expanded.value) closeCard()
})

// 卡片 → 居中展开：卡片放大 + 背景模糊 + 内容依次浮现
function openCard(card: DaughterCard) {
  expanded.value = card
  void nextTick(() => {
    const cardEl = overlayCardRef.value
    if (!cardEl) return
    gsap.fromTo(
      cardEl,
      { opacity: 0, scale: 0.88, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'power2.out' },
    )
    const contentTargets = [
      overlayTitleRef.value,
      overlaySubRef.value,
      overlayContentRef.value,
    ].filter((el): el is HTMLElement => el !== null)
    if (contentTargets.length) {
      gsap.fromTo(
        contentTargets,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: 'power2.out',
          delay: 0.12,
        },
      )
    }
    cardEl.focus()
  })
}

function closeCard() {
  expanded.value = null
}
</script>

<template>
  <section class="section daughter">
    <h2 ref="titleRef" class="daughter__title serif">今日为女儿节。</h2>
    <p ref="subtitleRef" class="daughter__subtitle">
      古时女子于七夕乞巧，<br />
      祈愿聪慧、灵巧，也祈愿未来。
    </p>
    <p ref="leadRef" class="daughter__lead">而我想把今夜，留给你。</p>

    <!-- 卡片默认态：标题 + 短句 + 装饰符号（REQ-DAUGHTER-05） -->
    <ul ref="cardsRef" class="daughter__cards">
      <li v-for="card in daughterCards" :key="card.id">
        <button type="button" class="daughter__card" @click="openCard(card)">
          <span class="daughter__card-symbol" aria-hidden="true">{{ card.symbol ?? '✦' }}</span>
          <span class="daughter__card-title serif">{{ card.title }}</span>
          <span class="daughter__card-subtitle">{{ card.subtitle }}</span>
        </button>
      </li>
    </ul>

    <button ref="buttonRef" class="btn-text" @click="emit('next')">下一章</button>

    <!-- 卡片 → 居中展开：背景模糊 + 完整内容 + 关闭按钮 -->
    <Transition name="fade">
      <div
        v-if="expanded"
        class="daughter__overlay"
        role="dialog"
        aria-modal="true"
        :aria-label="expanded.title"
        tabindex="-1"
        @click.self="closeCard"
      >
        <div ref="overlayCardRef" class="daughter__overlay-card">
          <button
            type="button"
            class="daughter__overlay-close"
            aria-label="关闭"
            @click="closeCard"
          >
            <X :size="18" />
          </button>
          <span class="daughter__overlay-symbol serif" aria-hidden="true">
            {{ expanded.symbol ?? '✦' }}
          </span>
          <h3 ref="overlayTitleRef" class="daughter__overlay-title serif">{{ expanded.title }}</h3>
          <p ref="overlaySubRef" class="daughter__overlay-subtitle">{{ expanded.subtitle }}</p>
          <div class="daughter__overlay-rule" aria-hidden="true" />
          <p ref="overlayContentRef" class="daughter__overlay-content">{{ expanded.content }}</p>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.daughter {
  gap: 22px;
}

.daughter__title {
  font-size: clamp(1.7rem, 4.5vw, 2.5rem);
  letter-spacing: 0.16em;
  text-indent: 0.16em;
}

.daughter__subtitle {
  font-size: clamp(0.9rem, 1.8vw, 1.05rem);
  line-height: 2.1;
  color: $color-text-secondary;
  letter-spacing: 0.08em;
}

.daughter__lead {
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  color: $color-gold-light;
  letter-spacing: 0.12em;
}

.daughter__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 14px;
  width: min(820px, 100%);
  list-style: none;
}

.daughter__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-height: 132px;
  padding: 22px 20px;
  border: 1px solid rgba(233, 227, 213, 0.16);
  border-radius: 4px;
  background: rgba(16, 22, 44, 0.55);
  cursor: pointer;
  transition:
    border-color 0.5s ease,
    background 0.5s ease,
    transform 0.5s ease,
    box-shadow 0.5s ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(201, 168, 106, 0.55);
    background: rgba(16, 22, 44, 0.85);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  }
}

.daughter__card-symbol {
  font-size: 1rem;
  color: $color-gold;
  margin-bottom: 4px;
}

.daughter__card-title {
  font-size: 1.05rem;
  color: $color-text-moon;
  letter-spacing: 0.2em;
  text-indent: 0.2em;
}

.daughter__card-subtitle {
  font-size: 0.78rem;
  color: $color-text-secondary;
  letter-spacing: 0.12em;
}

.daughter__overlay {
  position: absolute;
  inset: 0;
  z-index: $z-panel;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  outline: none;
}

.daughter__overlay-card {
  position: relative;
  width: min(480px, 100%);
  max-height: 82vh;
  overflow-y: auto;
  padding: 44px 40px 38px;
  background: rgba(16, 22, 44, 0.95);
  border: 1px solid rgba(201, 168, 106, 0.28);
  border-radius: 4px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
  text-align: center;
}

.daughter__overlay-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: $color-text-secondary;
  cursor: pointer;
  border-radius: 50%;
  transition:
    color 0.4s ease,
    background 0.4s ease;

  &:hover,
  &:focus-visible {
    color: $color-text-moon;
    background: rgba(233, 227, 213, 0.08);
  }
}

.daughter__overlay-symbol {
  display: block;
  font-size: 1.5rem;
  color: $color-gold;
  margin-bottom: 14px;
}

.daughter__overlay-title {
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  letter-spacing: 0.22em;
  text-indent: 0.22em;
  color: $color-text-moon;
  margin-bottom: 8px;
}

.daughter__overlay-subtitle {
  font-size: 0.9rem;
  color: $color-gold;
  letter-spacing: 0.16em;
}

.daughter__overlay-rule {
  width: 56px;
  height: 1px;
  margin: 22px auto;
  background: linear-gradient(90deg, transparent, rgba(201, 168, 106, 0.7), transparent);
}

.daughter__overlay-content {
  font-size: 1rem;
  line-height: 2.2;
  color: $color-white-60;
  letter-spacing: 0.06em;
}

@media (max-width: 767px) {
  .daughter__cards {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  .daughter__overlay-card {
    padding: 36px 24px 32px;
  }
}
</style>
