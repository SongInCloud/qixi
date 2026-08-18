<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fadeIn } from '@/utils/animation'
import { memories } from '@/mock/memories'

const emit = defineEmits<{ next: [] }>()

const titleRef = ref<HTMLElement | null>(null)
const hintRef = ref<HTMLParagraphElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)

onMounted(() => {
  fadeIn(titleRef.value, { delay: 0.15 })
  fadeIn(hintRef.value, { delay: 0.65 })
  fadeIn(buttonRef.value, { delay: 1.1 })
})
</script>

<template>
  <section class="section star-river">
    <h2 ref="titleRef" class="star-river__title serif">我把记得的事情，都藏进了星星里。</h2>
    <p ref="hintRef" class="star-river__hint">星河里，藏着 {{ memories.length }} 段回忆。</p>

    <!-- 记忆星星 / MemoryPanel / ImageViewer（REQ-STARRIVER-06~09）在后续阶段接入 -->

    <button ref="buttonRef" class="btn-text" @click="emit('next')">下一章</button>
  </section>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.star-river__title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  letter-spacing: 0.12em;
  text-indent: 0.12em;
  color: $color-text-moon;
}

.star-river__hint {
  font-size: clamp(0.9rem, 1.8vw, 1.05rem);
  color: $color-text-secondary;
  letter-spacing: 0.2em;
}
</style>
