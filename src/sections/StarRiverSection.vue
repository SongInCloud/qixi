<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MousePointerClick } from 'lucide-vue-next'
import { fadeIn } from '@/utils/animation'
import { memories } from '@/mock/memories'
import type { Memory } from '@/types'
import MemoryStar from '@/components/MemoryStar.vue'
import MemoryPanel from '@/components/MemoryPanel.vue'

const emit = defineEmits<{ next: [] }>()

const titleRef = ref<HTMLElement | null>(null)
const hintRef = ref<HTMLParagraphElement | null>(null)
const guideRef = ref<HTMLParagraphElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)
const selected = ref<Memory | null>(null)

onMounted(() => {
  fadeIn(titleRef.value, { delay: 0.15 })
  fadeIn(hintRef.value, { delay: 0.65 })
  fadeIn(guideRef.value, { delay: 1 })
  fadeIn(buttonRef.value, { delay: 1.1 })
})
</script>

<template>
  <section class="section star-river">
    <div class="star-river__head">
      <h2 ref="titleRef" class="star-river__title serif">我把记得的事情，都藏进了星星里。</h2>
      <p ref="hintRef" class="star-river__hint">星河里，藏着 {{ memories.length }} 段回忆。</p>
      <p ref="guideRef" class="star-river__guide">
        <MousePointerClick :size="15" aria-hidden="true" />
        <span>轻触星光，拾起一段回忆</span>
      </p>
    </div>

    <!-- 记忆星星：点击点亮 → 背景变暗 → 展示回忆（REQ-STARRIVER-06） -->
    <div class="star-river__field">
      <MemoryStar
        v-for="memory in memories"
        :key="memory.id"
        :memory="memory"
        :active="selected?.id === memory.id"
        @open="selected = memory"
      />
    </div>

    <button ref="buttonRef" class="btn-text star-river__next" @click="emit('next')">下一章</button>

    <Transition name="fade">
      <MemoryPanel v-if="selected" :memory="selected" @close="selected = null" />
    </Transition>
  </section>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.section.star-river {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  padding: 0;
}

.star-river__head {
  position: relative;
  z-index: 2;
  padding: 9vh 24px 0;
}

.star-river__field {
  position: absolute;
  inset: 0;
  z-index: 1;
}

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

.star-river__guide {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 10px;
  padding: 5px 11px;
  border: 1px solid rgba(201, 168, 106, 0.18);
  border-radius: 999px;
  background: rgba(8, 10, 24, 0.32);
  color: $color-gold-light;
  font-size: 0.76rem;
  letter-spacing: 0.14em;
  text-indent: 0.14em;
  opacity: 0;

  svg {
    flex: 0 0 auto;
    animation: star-river-guide-tap 2.4s ease-in-out infinite;
  }
}

.star-river__next {
  position: relative;
  z-index: 2;
  margin: auto auto 6vh;
}

@keyframes star-river-guide-tap {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.7;
  }
  45% {
    transform: translateY(2px) scale(0.9);
    opacity: 1;
  }
}

@media (max-width: 767px) {
  .star-river__head {
    padding: 72px 18px 0;
  }

  .star-river__next {
    margin-bottom: max(28px, env(safe-area-inset-bottom));
  }
}

@media (prefers-reduced-motion: reduce) {
  .star-river__guide svg {
    animation: none;
  }
}
</style>
