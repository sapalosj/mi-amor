<template>
  <button
    @click="$emit('click')"
    class="relative w-16 h-16 transform transition-transform hover:scale-110 active:scale-95"
  >
    <svg viewBox="0 0 32 32" class="w-full h-full">
      <path
        d="M16 28.5C16 28.5 3 20 3 11.5C3 7.5 6 4.5 9.5 4.5C12.5 4.5 14.5 6.5 16 8.5C17.5 6.5 19.5 4.5 22.5 4.5C26 4.5 29 7.5 29 11.5C29 20 16 28.5 16 28.5Z"
        class="fill-rose-500 stroke-rose-600"
        stroke-width="0.5"
      />
    </svg>
    <span class="absolute inset-0 flex items-center justify-center text-black font-dancing font-bold text-2xl" style="margin-top: -4px">{{ digit }}</span>
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
button:hover svg path {
  fill: rgb(239 68 68);
}
</style>