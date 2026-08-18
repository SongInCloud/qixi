<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fadeIn } from '@/utils/animation'

const emit = defineEmits<{ next: [] }>()

const lineTitle = ref<HTMLParagraphElement | null>(null)
const lineSub = ref<HTMLParagraphElement | null>(null)
const lineBody = ref<HTMLParagraphElement | null>(null)
const enterButton = ref<HTMLButtonElement | null>(null)

onMounted(() => {
  fadeIn(lineTitle.value, { delay: 0.2 })
  fadeIn(lineSub.value, { delay: 0.75 })
  fadeIn(lineBody.value, { delay: 1.25 })
  fadeIn(enterButton.value, { delay: 2 })
})
</script>

<template>
  <section class="section intro">
    <p ref="lineTitle" class="intro__title serif">七月初七。</p>
    <p ref="lineSub" class="intro__sub">古人说，今夜宜乞巧。</p>
    <p ref="lineBody" class="intro__body">
      今夜没有什么特别的事情。<br />
      只是想借着这一轮月亮，<br />
      送你一点东西。
    </p>
    <button ref="enterButton" class="btn-text" @click="emit('next')">入夜</button>
  </section>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.intro__title {
  font-size: clamp(2.2rem, 6vw, 3.4rem);
  letter-spacing: 0.2em;
  text-indent: 0.2em;
  color: $color-text-moon;
}

.intro__sub {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  letter-spacing: 0.28em;
  text-indent: 0.28em;
  color: $color-text-secondary;
}

.intro__body {
  font-size: clamp(0.9rem, 1.8vw, 1.05rem);
  line-height: 2.1;
  letter-spacing: 0.08em;
  color: $color-white-60;
}

.intro .btn-text {
  margin-top: 18px;
}
</style>
