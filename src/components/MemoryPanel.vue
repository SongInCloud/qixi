<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next'
import { useEventListener } from '@vueuse/core'
import { scaleIn } from '@/utils/animation'
import type { Memory } from '@/types'
import ImageViewer from './ImageViewer.vue'

const props = defineProps<{
  memory: Memory
}>()

const emit = defineEmits<{ close: [] }>()

const panelRef = ref<HTMLElement | null>(null)

const images = computed(() => {
  const list = props.memory.images?.length ? props.memory.images : []
  return props.memory.image && !list.length ? [props.memory.image] : list
})

const multiple = computed(() => images.value.length > 1)

const mediaIndex = ref(0)
const mediaFailed = ref(false)
const viewerOpen = ref(false)
const viewerIndex = ref(0)

watch(mediaIndex, () => {
  mediaFailed.value = false
})

function prevMedia() {
  if (!multiple.value) return
  mediaIndex.value = (mediaIndex.value - 1 + images.value.length) % images.value.length
}

function nextMedia() {
  if (!multiple.value) return
  mediaIndex.value = (mediaIndex.value + 1) % images.value.length
}

function openViewer(index: number) {
  viewerIndex.value = index
  viewerOpen.value = true
}

// 图片查看器打开时，ESC 由查看器处理（REQ-STARRIVER-09）
useEventListener(window, 'keydown', (e: KeyboardEvent) => {
  if (viewerOpen.value) return
  if (e.key === 'Escape') emit('close')
})

onMounted(() => {
  scaleIn(panelRef.value, { duration: 0.5 })
})
</script>

<template>
  <div
    class="memory-panel"
    role="dialog"
    aria-modal="true"
    :aria-label="memory.title"
    @click.self="emit('close')"
  >
    <div ref="panelRef" class="memory-panel__card">
      <button
        type="button"
        class="memory-panel__close"
        aria-label="关闭"
        @click="emit('close')"
      >
        <X :size="18" />
      </button>

      <!-- 图片区：单张直接展示，多张左右切换 + 圆点指示（REQ-STARRIVER-08） -->
      <div v-if="images.length" class="memory-panel__media">
        <button
          type="button"
          class="memory-panel__stage"
          :aria-label="`查看${memory.title}图片大图`"
          @click="openViewer(mediaIndex)"
        >
          <template v-if="!mediaFailed">
            <img
              :key="images[mediaIndex]"
              :src="images[mediaIndex]"
              :alt="`${memory.title} 照片 ${mediaIndex + 1}`"
              loading="lazy"
              @error="mediaFailed = true"
            />
          </template>
          <p v-else class="memory-panel__media-fallback">图片暂时无法抵达这里。</p>
        </button>

        <button
          v-if="multiple"
          type="button"
          class="memory-panel__media-nav memory-panel__media-nav--prev"
          aria-label="上一张"
          @click="prevMedia"
        >
          <ChevronLeft :size="22" />
        </button>
        <button
          v-if="multiple"
          type="button"
          class="memory-panel__media-nav memory-panel__media-nav--next"
          aria-label="下一张"
          @click="nextMedia"
        >
          <ChevronRight :size="22" />
        </button>

        <div v-if="multiple" class="memory-panel__dots">
          <span
            v-for="(_, index) in images"
            :key="index"
            class="memory-panel__dot"
            :class="{ 'memory-panel__dot--active': index === mediaIndex }"
          />
        </div>
      </div>

      <!-- 回忆内容（REQ-STARRIVER-07） -->
      <div class="memory-panel__meta">
        <p v-if="memory.date" class="memory-panel__date">{{ memory.date }}</p>
        <h3 class="memory-panel__title serif">{{ memory.title }}</h3>
        <p v-if="memory.location" class="memory-panel__location">{{ memory.location }}</p>
        <p class="memory-panel__description">{{ memory.description }}</p>
      </div>
    </div>

    <ImageViewer
      v-if="viewerOpen"
      :images="images"
      :initial-index="viewerIndex"
      @close="viewerOpen = false"
    />
  </div>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.memory-panel {
  position: fixed;
  inset: 0;
  z-index: $z-panel;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.memory-panel__card {
  position: relative;
  width: min(560px, 100%);
  max-height: 86vh;
  overflow-y: auto;
  // 为关闭按钮保留独立的顶部区域，避免与图片操作区重叠。
  padding: 64px 36px 32px;
  background: rgba(16, 22, 44, 0.92);
  border: 1px solid rgba(201, 168, 106, 0.28);
  border-radius: 4px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
}

.memory-panel__close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 22, 44, 0.96);
  border: 1px solid rgba(233, 227, 213, 0.14);
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

.memory-panel__media {
  position: relative;
  margin-bottom: 24px;
}

.memory-panel__stage {
  display: block;
  width: 100%;
  height: 240px;
  background: rgba(8, 10, 24, 0.6);
  border: 1px solid rgba(233, 227, 213, 0.1);
  border-radius: 4px;
  cursor: zoom-in;
  overflow: hidden;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.memory-panel__media-fallback {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-text-secondary;
  font-size: 0.9rem;
  letter-spacing: 0.12em;
}

.memory-panel__media-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(8, 10, 24, 0.55);
  border: 1px solid rgba(233, 227, 213, 0.18);
  border-radius: 50%;
  color: $color-text-moon;
  cursor: pointer;
  transition:
    background 0.4s ease,
    border-color 0.4s ease;

  &:hover,
  &:focus-visible {
    background: rgba(8, 10, 24, 0.85);
    border-color: rgba(201, 168, 106, 0.55);
  }

  &--prev {
    left: 10px;
  }

  &--next {
    right: 10px;
  }
}

.memory-panel__dots {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -18px;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.memory-panel__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(233, 227, 213, 0.25);
  transition: background 0.4s ease;

  &--active {
    background: $color-gold-light;
  }
}

.memory-panel__meta {
  text-align: left;
}

.memory-panel__date {
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  color: $color-text-secondary;
  margin-bottom: 6px;
}

.memory-panel__title {
  font-size: 1.5rem;
  letter-spacing: 0.14em;
  color: $color-text-moon;
  margin-bottom: 4px;
}

.memory-panel__location {
  font-size: 0.85rem;
  color: $color-gold;
  letter-spacing: 0.1em;
  margin-bottom: 14px;
}

.memory-panel__description {
  font-size: 0.95rem;
  line-height: 2.1;
  color: $color-white-60;
}

@media (max-width: 767px) {
  .memory-panel__card {
    padding: 60px 22px 26px;
  }

  .memory-panel__stage {
    height: 190px;
  }
}
</style>
