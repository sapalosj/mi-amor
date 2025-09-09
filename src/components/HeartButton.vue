<template>
  <button
    @click="$emit('click')"
    class="relative w-16 h-16 flex items-center justify-center transform transition-transform hover:scale-110 active:scale-95"
  >
    <div class="absolute inset-0 heart-button-shape bg-gradient-to-br from-rose-400 to-rose-600 shadow-lg"></div>
    <span class="relative z-10 text-white font-bold text-xl">{{ digit }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  digit: string | number
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.heart-button-shape {
  position: relative;
  width: 100%;
  height: 100%;
}

.heart-button-shape::before,
.heart-button-shape::after {
  content: '';
  position: absolute;
  top: 0;
  width: 50%;
  height: 80%;
  background: inherit;
  border-radius: 50% 50% 0 0;
}

.heart-button-shape::before {
  left: 50%;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.heart-button-shape::after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}
</style>