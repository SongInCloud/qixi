<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { fadeIn } from '@/utils/animation'
import type { WishOption } from '@/types'
import WishSelector from '@/components/WishSelector.vue'
import WishInput from '@/components/WishInput.vue'

const emit = defineEmits<{ next: [] }>()

// 愿望选项（PRD REQ-QIQIAO-03/04）
const wishOptions: WishOption[] = [
  { id: 'peace', label: '求安', text: '愿你所行之处，都有安心。' },
  { id: 'joy', label: '求乐', text: '愿你往后的日子，有很多值得开心的小事。' },
  { id: 'wish', label: '求愿', text: '愿你所想之事，都有慢慢实现的机会。' },
  { id: 'skill', label: '求巧', text: '愿你心有巧思，也有把喜欢的事情做好的能力。' },
  { id: 'meet', label: '求遇', text: '愿你一路所遇，都是温柔。' },
  { id: 'custom', label: '自书', text: '' },
]

type Stage = 'idle' | 'compose' | 'flight' | 'done'

const stage = ref<Stage>('idle')
const selectedWish = ref<WishOption | null>(null)
const wishText = ref('')
const newStars = ref<{ id: number; x: number; y: number; text: string }[]>([])
let starId = 0

const titleRef = ref<HTMLElement | null>(null)
const bodyRef = ref<HTMLParagraphElement | null>(null)
const stageRef = ref<HTMLElement | null>(null)
const starFieldRef = ref<HTMLElement | null>(null)
const wishTextRef = ref<HTMLParagraphElement | null>(null)
const flightDotRef = ref<HTMLSpanElement | null>(null)
const doneRef = ref<HTMLParagraphElement | null>(null)

onMounted(() => {
  fadeIn(titleRef.value, { delay: 0.1 })
  fadeIn(bodyRef.value, { delay: 0.5 })
  fadeIn(stageRef.value, { delay: 0.9 })
})

function selectWish(option: WishOption) {
  selectedWish.value = option
  stage.value = 'compose'
}

function reset() {
  selectedWish.value = null
  stage.value = 'idle'
}

function placeWish(text: string) {
  wishText.value = text
  stage.value = 'flight'
  void nextTick(runFlight)
}

// 愿望入星河动画（REQ-QIQIAO-06）：
// 轻微缩小 → 化作光点 → 向星空移动 → 形成一颗新星
function runFlight() {
  const textEl = wishTextRef.value
  const dotEl = flightDotRef.value
  const fieldEl = starFieldRef.value
  if (!textEl || !dotEl || !fieldEl) {
    finishFlight()
    return
  }

  const textRect = textEl.getBoundingClientRect()
  const fieldRect = fieldEl.getBoundingClientRect()
  const startX = textRect.left + textRect.width / 2 - fieldRect.left
  const startY = textRect.top + textRect.height / 2 - fieldRect.top

  const targetX = 12 + Math.random() * 76
  const targetY = 10 + Math.random() * 22
  const endX = (targetX / 100) * fieldRect.width
  const endY = (targetY / 100) * fieldRect.height

  dotEl.style.left = `${startX}px`
  dotEl.style.top = `${startY}px`

  const timeline = gsap.timeline({
    onComplete: () => {
      addNewStar(targetX, targetY)
      finishFlight()
    },
  })

  timeline.to(textEl, { scale: 0.88, duration: 0.55, ease: 'power2.inOut' })
  timeline.to(
    textEl,
    { opacity: 0, scale: 0.35, duration: 0.45, ease: 'power2.in' },
    '+=0.05',
  )
  timeline.fromTo(
    dotEl,
    { opacity: 0, scale: 0.3 },
    { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' },
    '<',
  )
  timeline.to(dotEl, { left: endX, top: endY, duration: 1.35, ease: 'power2.inOut' })
  timeline.to(dotEl, { scale: 2, opacity: 0.85, duration: 0.3, ease: 'power2.in' })
  timeline.to(dotEl, { opacity: 0, scale: 0.4, duration: 0.4, ease: 'power2.out' })
}

function addNewStar(x: number, y: number) {
  newStars.value.push({ id: ++starId, x, y, text: wishText.value })
}

function finishFlight() {
  stage.value = 'done'
  void nextTick(() => {
    fadeIn(doneRef.value, { duration: 0.8 })
  })
}
</script>

<template>
  <section class="section qiqiao">
    <div class="qiqiao__head">
      <h2 ref="titleRef" class="qiqiao__title serif">乞巧</h2>
      <p ref="bodyRef" class="qiqiao__body">
        古人于七夕乞巧。<br />
        乞聪慧，乞巧思，乞美好。<br />
        那么今夜，你想求什么？
      </p>
    </div>

    <!-- 愿望舞台：选择 / 撰写 / 飞行 / 完成 -->
    <div ref="stageRef" class="qiqiao__stage">
      <WishSelector
        v-if="stage === 'idle'"
        :options="wishOptions"
        :selected-id="null"
        @select="selectWish"
      />

      <div
        v-else-if="stage === 'compose' && selectedWish && selectedWish.id !== 'custom'"
        class="qiqiao__wish"
      >
        <p ref="wishTextRef" class="qiqiao__wish-text serif">{{ selectedWish.text }}</p>
        <button type="button" class="btn-text" @click="placeWish(selectedWish.text)">
          放入星河
        </button>
        <button type="button" class="text-link" @click="reset">重新选择</button>
      </div>

      <WishInput
        v-else-if="stage === 'compose' && selectedWish?.id === 'custom'"
        @submit="placeWish"
        @cancel="reset"
      />

      <p v-else-if="stage === 'flight'" ref="wishTextRef" class="qiqiao__wish-text serif">
        {{ wishText }}
      </p>

      <p v-else-if="stage === 'done'" ref="doneRef" class="qiqiao__done serif">
        愿你所愿，<br />都有星河听见。
      </p>
    </div>

    <!-- 新星层：愿望化作的星星与飞行光点 -->
    <div ref="starFieldRef" class="qiqiao__stars" aria-hidden="true">
      <span
        v-for="star in newStars"
        :key="star.id"
        class="qiqiao__star"
        :style="{ left: `${star.x}%`, top: `${star.y}%` }"
        :title="star.text"
      />
      <span ref="flightDotRef" class="qiqiao__flight-dot" />
    </div>

    <div class="qiqiao__foot">
      <Transition name="fade">
        <button v-if="stage === 'done'" type="button" class="btn-text" @click="emit('next')">
          下一章
        </button>
      </Transition>
    </div>
  </section>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.qiqiao {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  padding: 0;
}

.qiqiao__head {
  position: relative;
  z-index: 2;
  padding: 8vh 24px 0;
}

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

.qiqiao__stage {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 24px;
  min-height: 0;
}

.qiqiao__wish {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

.qiqiao__wish-text {
  max-width: 560px;
  font-size: clamp(1.15rem, 2.8vw, 1.6rem);
  line-height: 2.1;
  color: $color-gold-light;
  letter-spacing: 0.14em;
  text-shadow: 0 0 24px rgba(227, 201, 139, 0.25);
  transform-origin: center;
}

.qiqiao__done {
  font-size: clamp(1.2rem, 3vw, 1.7rem);
  line-height: 2.1;
  color: $color-gold-light;
  letter-spacing: 0.2em;
  text-shadow: 0 0 30px rgba(227, 201, 139, 0.3);
}

.qiqiao__stars {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.qiqiao__star {
  position: absolute;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  margin-top: -5px;
  border-radius: 50%;
  background: $color-gold-light;
  box-shadow:
    0 0 8px rgba(227, 201, 139, 0.9),
    0 0 20px rgba(227, 201, 139, 0.4);
  animation: qiqiao-star-pop 0.8s ease both;
}

.qiqiao__flight-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  margin-left: -6px;
  margin-top: -6px;
  border-radius: 50%;
  background: $color-gold-light;
  box-shadow:
    0 0 12px rgba(227, 201, 139, 0.95),
    0 0 30px rgba(227, 201, 139, 0.5);
  opacity: 0;
}

.qiqiao__foot {
  position: relative;
  z-index: 2;
  min-height: 96px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-bottom: 6vh;
}

@keyframes qiqiao-star-pop {
  from {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.4);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .qiqiao__star {
    animation: none;
  }
}
</style>
