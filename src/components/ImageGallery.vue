<template>
  <div class="gallery-container">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="image in images"
        :key="image.id"
        @click="selectImage(image)"
        class="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
      >
        <div class="aspect-square overflow-hidden">
          <img 
            :src="image.url" 
            :alt="image.caption"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
          <p class="text-white text-sm font-medium p-3 w-full text-center">{{ image.caption }}</p>
        </div>
      </div>
    </div>

    <transition name="modal">
      <div
        v-if="selectedImage"
        @click="selectedImage = null"
        class="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg p-4 max-w-3xl max-h-[90vh] overflow-auto">
          <img 
            :src="selectedImage.url" 
            :alt="selectedImage.caption"
            class="w-full h-auto rounded-lg mb-4"
          />
          <div class="text-center">
            <h3 class="text-xl font-bold text-rose-700 mb-2">{{ selectedImage.caption }}</h3>
            <p class="text-gray-600 text-sm">Click anywhere to close</p>
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