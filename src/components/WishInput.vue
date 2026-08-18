<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    maxLength?: number
  }>(),
  {
    maxLength: 100,
  },
)

const emit = defineEmits<{ submit: [text: string]; cancel: [] }>()

const text = ref('')
const error = ref(false)

function onInput() {
  if (error.value) error.value = false
}

function submit() {
  const value = text.value.trim()
  if (!value) {
    error.value = true
    return
  }
  emit('submit', value)
}
</script>

<template>
  <div class="wish-input">
    <p class="wish-input__prompt">今夜，你想向星辰许什么愿？</p>

    <textarea
      v-model="text"
      class="wish-input__field"
      :maxlength="maxLength"
      rows="3"
      aria-label="许愿内容"
      placeholder="写下一点什么……"
      @input="onInput"
    />

    <div class="wish-input__footer">
      <span v-if="error" class="wish-input__error" role="alert">写下一点什么吧。</span>
      <span v-else class="wish-input__count">{{ text.length }} / {{ maxLength }}</span>
    </div>

    <button type="button" class="btn-text" @click="submit">放入星河</button>
    <button type="button" class="text-link" @click="emit('cancel')">重新选择</button>
  </div>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.wish-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: min(480px, 100%);
}

.wish-input__prompt {
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  color: $color-text-moon;
  letter-spacing: 0.12em;
}

.wish-input__field {
  width: 100%;
  min-height: 108px;
  resize: vertical;
  padding: 14px 16px;
  background: rgba(8, 10, 24, 0.55);
  border: 1px solid rgba(233, 227, 213, 0.18);
  border-radius: 4px;
  color: $color-text-moon;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.9;
  outline: none;
  transition:
    border-color 0.4s ease,
    box-shadow 0.4s ease;

  &::placeholder {
    color: rgba(170, 164, 149, 0.65);
  }

  &:focus {
    border-color: rgba(201, 168, 106, 0.65);
    box-shadow: 0 0 0 3px rgba(201, 168, 106, 0.12);
  }
}

.wish-input__footer {
  width: 100%;
  min-height: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.wish-input__count {
  margin-left: auto;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  color: $color-text-secondary;
}

.wish-input__error {
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  color: $color-cinnabar;
  animation: wish-input-shake 0.4s ease;
}

.wish-input .text-link {
  margin-top: -6px;
}

@keyframes wish-input-shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}
</style>
