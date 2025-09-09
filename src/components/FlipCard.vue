<template>
  <div 
    class="card-flip w-full h-64 cursor-pointer"
    :class="{ 'flipped': isFlipped }"
    @click="flip"
  >
    <div class="card-flip-inner relative w-full h-full">
      <div class="card-front absolute inset-0 bg-gradient-to-br from-rose-300 to-pink-400 rounded-lg shadow-lg flex items-center justify-center">
        <div class="text-center p-4">
          <div class="text-6xl mb-2">{{ emoji }}</div>
          <h3 class="text-white font-bold text-xl">{{ title }}</h3>
        </div>
      </div>
      <div class="card-back absolute inset-0 bg-white rounded-lg shadow-lg flex items-center justify-center p-6">
        <div class="text-center">
          <h3 class="text-rose-700 font-bold text-xl mb-3">{{ title }}</h3>
          <p class="text-gray-700 leading-relaxed">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
  message: string
  emoji: string
}>()

const emit = defineEmits<{
  flipped: []
}>()

const isFlipped = ref(false)

const flip = () => {
  if (!isFlipped.value) {
    isFlipped.value = true
    emit('flipped')
  }
}
</script>