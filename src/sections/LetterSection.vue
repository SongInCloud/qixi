<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fadeIn } from '@/utils/animation'
import { letter } from '@/mock/letter'

const emit = defineEmits<{ next: [] }>()

const paperRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)

onMounted(() => {
  fadeIn(paperRef.value, { delay: 0.2 })
  fadeIn(buttonRef.value, { delay: 0.8 })
})
</script>

<template>
  <section class="section letter">
    <div ref="paperRef" class="letter__paper">
      <h2 class="letter__title serif">{{ letter.title }}</h2>
      <p class="letter__greeting">{{ letter.greeting }}</p>
      <p v-for="(paragraph, index) in letter.paragraphs" :key="index" class="letter__paragraph">
        {{ paragraph }}
      </p>
      <p class="letter__ending serif">{{ letter.ending }}</p>
    </div>

    <!-- 结束状态（REQ-ENDING-01）在后续阶段接入 -->
    <button ref="buttonRef" class="btn-text" @click="emit('next')">结束</button>
  </section>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.letter__paper {
  max-width: 620px;
  width: 100%;
  padding: 48px 44px;
  background: rgba(233, 227, 213, 0.055);
  border: 1px solid rgba(233, 227, 213, 0.14);
  border-radius: 4px;
  text-align: left;
}

.letter__title {
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  letter-spacing: 0.28em;
  text-indent: 0.28em;
  text-align: center;
  color: $color-gold-light;
  margin-bottom: 28px;
}

.letter__greeting {
  font-size: 1.05rem;
  margin-bottom: 18px;
  color: $color-text-moon;
}

.letter__paragraph {
  margin-bottom: 16px;
  color: $color-white-60;
  font-size: 0.95rem;
  line-height: 2.2;
}

.letter__ending {
  margin-top: 28px;
  text-align: right;
  color: $color-gold-light;
  letter-spacing: 0.14em;
}
</style>
