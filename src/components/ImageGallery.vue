<template>
  <div class="gallery-container">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="image in images"
        :key="image.id"
        @click="selectImage(image)"
        class="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
      >
        <div class="aspect-square bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center">
          <div class="text-center p-4">
            <div class="text-4xl mb-2">📷</div>
            <p class="text-white text-sm font-medium">{{ image.caption }}</p>
          </div>
        </div>
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"></div>
      </div>
    </div>

    <transition name="modal">
      <div
        v-if="selectedImage"
        @click="selectedImage = null"
        class="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg p-6 max-w-md">
          <div class="text-center">
            <div class="text-6xl mb-4">💝</div>
            <h3 class="text-xl font-bold text-rose-700 mb-2">{{ selectedImage.caption }}</h3>
            <p class="text-gray-600">Click anywhere to close</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GalleryImage } from '@/stores/config'

defineProps<{
  images: GalleryImage[]
}>()

const selectedImage = ref<GalleryImage | null>(null)

const selectImage = (image: GalleryImage) => {
  selectedImage.value = image
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>