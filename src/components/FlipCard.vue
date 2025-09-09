<template>
  <div 
    class="card-flip w-full h-80 cursor-pointer"
    :class="{ 'flipped': isFlipped }"
    @click="flip"
  >
    <div class="card-flip-inner relative w-full h-full">
      <div class="card-front absolute inset-0 rounded-lg shadow-lg overflow-hidden">
        <img 
          :src="imageUrl" 
          :alt="title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
          <h3 class="text-white font-dancing text-2xl p-4 w-full text-center">{{ title }}</h3>
        </div>
      </div>
      <div class="card-back absolute inset-0 bg-white rounded-lg shadow-lg flex items-center justify-center p-6">
        <div class="text-center">
          <h3 class="text-rose-700 font-dancing text-2xl mb-3">{{ title }}</h3>
          <p class="text-gray-700 leading-relaxed font-dancing">{{ message }}</p>
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
  imageUrl: string
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