<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fadeIn } from '@/utils/animation'
import { daughterCards } from '@/mock/daughter'

const emit = defineEmits<{ next: [] }>()

const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLParagraphElement | null>(null)
const leadRef = ref<HTMLParagraphElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)

onMounted(() => {
  fadeIn(titleRef.value, { delay: 0.1 })
  fadeIn(subtitleRef.value, { delay: 0.5 })
  fadeIn(leadRef.value, { delay: 0.9 })
  fadeIn(cardsRef.value, { delay: 1.3 })
  fadeIn(buttonRef.value, { delay: 1.8 })
})
</script>

<template>
  <section class="section daughter">
    <h2 ref="titleRef" class="daughter__title serif">今日为女儿节。</h2>
    <p ref="subtitleRef" class="daughter__subtitle">
      古时女子于七夕乞巧，<br />
      祈愿聪慧、灵巧，也祈愿未来。
    </p>
    <p ref="leadRef" class="daughter__lead">而我想把今夜，留给你。</p>

    <!-- 卡片展开交互（REQ-DAUGHTER-05）在后续阶段接入 -->
    <ul ref="cardsRef" class="daughter__cards">
      <li v-for="card in daughterCards" :key="card.id" class="daughter__card">
        <span class="daughter__card-title serif">{{ card.title }}</span>
        <span class="daughter__card-subtitle">{{ card.subtitle }}</span>
      </li>
    </ul>

    <button ref="buttonRef" class="btn-text" @click="emit('next')">下一章</button>
  </section>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  max-width: 720px;
  list-style: none;
}

.daughter__card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 150px;
  padding: 18px 22px;
  border: 1px solid rgba(233, 227, 213, 0.16);
  border-radius: 4px;
  background: rgba(16, 22, 44, 0.55);
  cursor: pointer;
  transition:
    border-color 0.5s ease,
    background 0.5s ease,
    transform 0.5s ease;

  &:hover {
    border-color: rgba(201, 168, 106, 0.55);
    background: rgba(16, 22, 44, 0.85);
    transform: translateY(-2px);
  }
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
</style>
