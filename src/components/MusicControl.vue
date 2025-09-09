<template>
  <div class="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-3 z-50">
    <button
      @click="store.toggleMusic"
      class="text-rose-500 hover:text-rose-600 transition-colors"
      :title="store.musicPlaying ? 'Pause music' : 'Play music'"
    >
      <svg v-if="store.musicPlaying" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
      </svg>
      <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config'

const store = useConfigStore()
</script>