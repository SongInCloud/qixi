<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fadeIn } from '@/utils/animation'
import type { WishOption } from '@/types'

const emit = defineEmits<{ next: [] }>()

// 愿望选项（PRD REQ-QIQIAO-03）
const wishOptions: WishOption[] = [
  { id: 'peace', label: '求安', text: '愿你所行之处，都有安心。' },
  { id: 'joy', label: '求乐', text: '愿你往后的日子，有很多值得开心的小事。' },
  { id: 'wish', label: '求愿', text: '愿你所想之事，都有慢慢实现的机会。' },
  { id: 'skill', label: '求巧', text: '愿你心有巧思，也有把喜欢的事情做好的能力。' },
  { id: 'meet', label: '求遇', text: '愿你一路所遇，都是温柔。' },
  { id: 'custom', label: '自书', text: '今夜，你想向星辰许什么愿？' },
]

const titleRef = ref<HTMLElement | null>(null)
const bodyRef = ref<HTMLParagraphElement | null>(null)
const optionsRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)

onMounted(() => {
  fadeIn(titleRef.value, { delay: 0.1 })
  fadeIn(bodyRef.value, { delay: 0.5 })
  fadeIn(optionsRef.value, { delay: 0.9 })
  fadeIn(buttonRef.value, { delay: 1.3 })
})
</script>

<template>
  <section class="section qiqiao">
    <h2 ref="titleRef" class="qiqiao__title serif">乞巧</h2>
    <p ref="bodyRef" class="qiqiao__body">
      古人于七夕乞巧。<br />
      乞聪慧，乞巧思，乞美好。<br />
      那么今夜，你想求什么？
    </p>

    <!-- 愿望选择与自书输入（REQ-QIQIAO-05/06）在后续阶段接入 -->
    <ul ref="optionsRef" class="qiqiao__options">
      <li v-for="option in wishOptions" :key="option.id" class="qiqiao__option serif">
        {{ option.label }}
      </li>
    </ul>

    <button ref="buttonRef" class="btn-text" @click="emit('next')">下一章</button>
  </section>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.qiqiao__title {
  font-size: clamp(2rem, 5vw, 2.8rem);
  letter-spacing: 0.3em;
  text-indent: 0.3em;
  color: $color-text-moon;
}

.qiqiao__body {
  font-size: clamp(0.95rem, 1.9vw, 1.1rem);
  line-height: 2.1;
  color: $color-text-secondary;
  letter-spacing: 0.08em;
}

.qiqiao__options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  max-width: 560px;
  list-style: none;
}

.qiqiao__option {
  min-width: 96px;
  padding: 12px 18px;
  border: 1px solid rgba(201, 168, 106, 0.4);
  border-radius: 999px;
  color: $color-gold-light;
  font-size: 1rem;
  letter-spacing: 0.24em;
  text-indent: 0.24em;
  background: rgba(16, 22, 44, 0.5);
  cursor: pointer;
  transition:
    border-color 0.5s ease,
    background 0.5s ease,
    color 0.5s ease;

  &:hover {
    border-color: $color-gold;
    background: rgba(201, 168, 106, 0.12);
    color: $color-text-moon;
  }
}
</style>
