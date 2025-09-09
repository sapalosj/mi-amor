<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="text-center mb-8">
      <h1 class="text-4xl md:text-5xl font-vibes text-rose-800 mb-4 animate-float">
        Enter Our Special Date
      </h1>
      <p class="text-rose-600 text-lg font-dancing">September 10th</p>
    </div>

    <div class="mb-8">
      <div class="flex space-x-4 justify-center mb-6">
        <div
          v-for="(digit, index) in passcode"
          :key="index"
          class="w-16 h-16 border-4 border-rose-400 rounded-lg flex items-center justify-center bg-white shadow-md transition-all duration-300"
          :class="{ 'bg-rose-100 scale-110': digit !== '' }"
        >
          <span class="text-2xl font-bold text-rose-700 font-dancing">{{ digit || '•' }}</span>
        </div>
      </div>

      <transition name="shake">
        <p v-if="error" class="text-red-500 text-center mb-4">
          Incorrect! Try our special date: 09/10
        </p>
      </transition>
    </div>

    <div class="grid grid-cols-3 gap-4 max-w-xs mx-auto">
      <HeartButton
        v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :key="num"
        :digit="num"
        @click="addDigit(num.toString())"
      />
      <div class="col-start-2">
        <HeartButton digit="0" @click="addDigit('0')" />
      </div>
      <button
        @click="clearPasscode"
        class="col-start-3 w-16 h-16 bg-gray-400 hover:bg-gray-500 text-white rounded-full flex items-center justify-center transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HeartButton from '@/components/HeartButton.vue'

const router = useRouter()
const passcode = ref<string[]>(['', '', '', ''])
const currentIndex = ref(0)
const error = ref(false)

const addDigit = (digit: string) => {
  if (currentIndex.value < 4) {
    passcode.value[currentIndex.value] = digit
    currentIndex.value++
    
    if (currentIndex.value === 4) {
      checkPasscode()
    }
  }
}

const clearPasscode = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    passcode.value[currentIndex.value] = ''
    error.value = false
  }
}

const checkPasscode = () => {
  const enteredCode = passcode.value.join('')
  if (enteredCode === '0910') {
    setTimeout(() => {
      router.push('/mail')
    }, 500)
  } else {
    error.value = true
    setTimeout(() => {
      passcode.value = ['', '', '', '']
      currentIndex.value = 0
    }, 1500)
  }
}
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.shake-enter-active {
  animation: shake 0.5s;
}
</style>