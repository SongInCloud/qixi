<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next'
import { useEventListener } from '@vueuse/core'
import { scaleIn } from '@/utils/animation'

const props = defineProps<{
  images: string[]
  initialIndex?: number
}>()

const emit = defineEmits<{ close: [] }>()

const viewerRef = ref<HTMLElement | null>(null)
const current = ref(props.initialIndex ?? 0)
const failed = ref<boolean[]>([])

const multiple = computed(() => props.images.length > 1)

function prev() {
  if (!multiple.value) return
  current.value = (current.value - 1 + props.images.length) % props.images.length
}

function next() {
  if (!multiple.value) return
  current.value = (current.value + 1) % props.images.length
}

function markFailed(index: number) {
  failed.value[index] = true
}

// 切换图片时允许重试加载（PRD §29 图片加载失败处理）
watch(current, () => {
  failed.value[current.value] = false
})

let touchStartX = 0

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
}

function onTouchEnd(e: TouchEvent) {
  const delta = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(delta) > 48) {
    if (delta < 0) next()
    else prev()
  }
}

useEventListener(window, 'keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
})

onMounted(() => {
  scaleIn(viewerRef.value, { duration: 0.4 })
  viewerRef.value?.focus()
})
</script>

<template>
  <div
    ref="viewerRef"
    class="image-viewer"
    role="dialog"
    aria-modal="true"
    aria-label="图片查看"
    tabindex="-1"
    @click.self="emit('close')"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <button type="button" class="image-viewer__close" aria-label="关闭" @click="emit('close')">
      <X :size="22" />
    </button>

    <button
      v-if="multiple"
      type="button"
      class="image-viewer__nav image-viewer__nav--prev"
      aria-label="上一张"
      @click="prev"
    >
      <ChevronLeft :size="30" />
    </button>
    <button
      v-if="multiple"
      type="button"
      class="image-viewer__nav image-viewer__nav--next"
      aria-label="下一张"
      @click="next"
    >
      <ChevronRight :size="30" />
    </button>

    <div class="image-viewer__stage">
      <template v-if="!failed[current]">
        <img
          :key="images[current]"
          :src="images[current]"
          :alt="`图片 ${current + 1}`"
          @error="markFailed(current)"
        />
      </template>
      <p v-else class="image-viewer__fallback">图片暂时无法抵达这里。</p>
    </div>

    <p v-if="multiple" class="image-viewer__counter">{{ current + 1 }} / {{ images.length }}</p>
  </div>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.image-viewer {
  position: fixed;
  inset: 0;
  z-index: $z-lightbox;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  outline: none;
}

.image-viewer__close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(233, 227, 213, 0.06);
  border: 1px solid rgba(233, 227, 213, 0.16);
  border-radius: 50%;
  color: $color-text-moon;
  cursor: pointer;
  transition:
    background 0.4s ease,
    color 0.4s ease;

  &:hover,
  &:focus-visible {
    background: rgba(233, 227, 213, 0.14);
    color: $color-gold-light;
  }
}

.image-viewer__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(233, 227, 213, 0.06);
  border: 1px solid rgba(233, 227, 213, 0.16);
  border-radius: 50%;
  color: $color-text-moon;
  cursor: pointer;
  transition:
    background 0.4s ease,
    color 0.4s ease;

  &:hover,
  &:focus-visible {
    background: rgba(233, 227, 213, 0.14);
    color: $color-gold-light;
  }

  &--prev {
    left: 24px;
  }

  &--next {
    right: 24px;
  }
}

.image-viewer__stage {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 84px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    user-select: none;
  }
}

.image-viewer__fallback {
  color: $color-text-secondary;
  letter-spacing: 0.2em;
  font-size: 0.95rem;
}

.image-viewer__counter {
  position: absolute;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  color: $color-text-secondary;
  font-size: 0.85rem;
  letter-spacing: 0.3em;
}

@media (max-width: 767px) {
  .image-viewer__stage {
    padding: 56px 16px;
  }

  .image-viewer__nav {
    width: 40px;
    height: 40px;

    &--prev {
      left: 10px;
    }

    &--next {
      right: 10px;
    }
  }
}
</style>
