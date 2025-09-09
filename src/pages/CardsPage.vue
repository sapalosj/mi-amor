<template>
  <div class="min-h-screen p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-vibes text-rose-800 mb-4">
          Six Years, Six Memories
        </h1>
        <p class="text-rose-600 font-dancing text-lg">Click each card to reveal a special message</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <FlipCard
          v-for="card in cards"
          :key="card.id"
          :title="card.title"
          :message="card.message"
          :imageUrl="card.imageUrl"
          @flipped="onCardFlipped"
        />
      </div>

      <transition name="fade">
        <div v-if="allFlipped" class="text-center">
          <button
            @click="goToGallery"
            class="bg-rose-500 text-white py-3 px-8 rounded-full hover:bg-rose-600 transition duration-200 transform hover:scale-105 animate-heartbeat"
          >
            View Our Gallery →
          </button>
        </div>
      </transition>
    </div>
    <MusicControl v-if="store.musicPlaying" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/config'
import FlipCard from '@/components/FlipCard.vue'
import MusicControl from '@/components/MusicControl.vue'

const router = useRouter()
const store = useConfigStore()
const cards = ref(store.cardMessages)
const flippedCount = ref(0)


const allFlipped = computed(() => flippedCount.value === cards.value.length)

const onCardFlipped = () => {
  flippedCount.value++
}

const goToGallery = () => {
  router.push('/gallery')
}
</script>