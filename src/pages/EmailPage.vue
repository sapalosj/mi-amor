<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="text-center mb-8">
      <h1 class="text-4xl md:text-5xl font-vibes text-rose-800 mb-4">
        You've Got Mail! 💌
      </h1>
    </div>

    <div class="relative">
      <div 
        v-if="!isOpen"
        @click="openEnvelope"
        class="cursor-pointer transform transition-transform hover:scale-105"
      >
        <div class="envelope">
          <div class="envelope-top"></div>
          <div class="envelope-body">
            <div class="heart-seal"></div>
          </div>
        </div>
      </div>

      <transition name="unfold">
        <div v-if="isOpen" class="letter-container">
          <div class="letter bg-white p-8 rounded-lg shadow-2xl max-w-md">
            <p class="text-gray-700 leading-relaxed whitespace-pre-line font-dancing text-lg">{{ emailMessage }}</p>
            <div class="mt-6 text-center">
              <button
                @click="goToCards"
                class="bg-rose-500 text-white py-3 px-8 rounded-full hover:bg-rose-600 transition duration-200 transform hover:scale-105"
              >
                Continue to Memories →
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Music control -->
    <div v-if="isOpen" class="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-3">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/config'

const router = useRouter()
const store = useConfigStore()
const isOpen = ref(false)
const emailMessage = ref(store.emailMessage)

const openEnvelope = () => {
  isOpen.value = true
  // Start playing music when envelope is opened
  store.playMusic()
}

const goToCards = () => {
  router.push('/cards')
}
</script>

<style scoped>
.envelope {
  width: 280px;
  height: 180px;
  position: relative;
}

.envelope-top {
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
  border-left: 140px solid transparent;
  border-right: 140px solid transparent;
  border-top: 100px solid #f43f5e;
  z-index: 2;
  transform-origin: top center;
  transition: transform 0.6s ease;
}

.envelope:hover .envelope-top {
  transform: rotateX(-30deg);
}

.envelope-body {
  position: absolute;
  bottom: 0;
  width: 280px;
  height: 140px;
  background: linear-gradient(to bottom, #fda4af, #fb7185);
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart-seal {
  width: 40px;
  height: 40px;
  position: relative;
}

.heart-seal::before,
.heart-seal::after {
  content: '';
  position: absolute;
  top: 0;
  width: 26px;
  height: 40px;
  background: white;
  border-radius: 26px 26px 0 0;
}

.heart-seal::before {
  left: 20px;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.heart-seal::after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}

.letter-container {
  animation: unfoldLetter 0.8s ease-out;
}

@keyframes unfoldLetter {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }
  50% {
    transform: scaleY(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}

.unfold-enter-active {
  animation: unfoldLetter 0.8s ease-out;
}
</style>