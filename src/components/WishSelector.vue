<script setup lang="ts">
import type { WishOption } from '@/types'

defineProps<{
  options: WishOption[]
  selectedId: string | null
}>()

const emit = defineEmits<{ select: [option: WishOption] }>()
</script>

<template>
  <ul class="wish-selector">
    <li v-for="option in options" :key="option.id">
      <button
        type="button"
        class="wish-selector__option serif"
        :class="{ 'wish-selector__option--selected': option.id === selectedId }"
        :aria-pressed="option.id === selectedId"
        @click="emit('select', option)"
      >
        {{ option.label }}
      </button>
    </li>
  </ul>
</template>

<style lang="scss">
@use '@/styles/variables' as *;

.wish-selector {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  max-width: 560px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.wish-selector__option {
  min-width: 96px;
  padding: 12px 18px;
  border: 1px solid rgba(201, 168, 106, 0.4);
  border-radius: 999px;
  background: rgba(16, 22, 44, 0.5);
  color: $color-gold-light;
  font-size: 1rem;
  letter-spacing: 0.24em;
  text-indent: 0.24em;
  cursor: pointer;
  transition:
    border-color 0.5s ease,
    background 0.5s ease,
    color 0.5s ease,
    transform 0.4s ease;

  &:hover,
  &:focus-visible {
    border-color: $color-gold;
    background: rgba(201, 168, 106, 0.12);
    color: $color-text-moon;
    transform: translateY(-2px);
  }

  &--selected {
    border-color: $color-gold;
    background: rgba(201, 168, 106, 0.18);
    color: $color-text-moon;
  }
}
</style>
