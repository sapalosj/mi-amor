<template>
  <div class="min-h-screen p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-vibes text-rose-800 mb-4 animate-float">
          Our Beautiful Journey
        </h1>
        <p class="text-rose-600 text-lg max-w-2xl mx-auto font-dancing">{{ galleryMessage }}</p>
      </div>

      <ImageGallery :images="images" />

      <div class="mt-12 text-center">
        <div class="inline-block bg-white rounded-lg shadow-xl p-8 max-w-md">
          <div class="text-6xl mb-4 animate-heartbeat">💕</div>
          <h2 class="text-3xl font-vibes text-rose-800 mb-3">Happy 6th Anniversary!</h2>
          <p class="text-gray-700 mb-6 font-dancing text-lg">
            Here's to many more years of love, laughter, and beautiful memories together.
          </p>
          <p class="text-rose-600 font-dancing text-xl">Forever yours,</p>
          <p class="text-rose-700 font-vibes text-2xl">With all my love ❤️</p>
        </div>
      </div>

      <div class="mt-8 text-center">
        <button
          @click="startOver"
          class="text-rose-500 hover:text-rose-600 underline"
        >
          Start from beginning
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/config'
import ImageGallery from '@/components/ImageGallery.vue'

const router = useRouter()
const store = useConfigStore()
const galleryMessage = ref(store.galleryMessage)
const images = ref(store.galleryImages)

const startOver = () => {
  router.push('/')
}
</script>