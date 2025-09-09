<template>
  <div class="min-h-screen p-4 md:p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-rose-800 mb-8 text-center">Admin Configuration</h1>
      
      <div v-if="!isAuthenticated" class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Enter Admin Password</h2>
        <form @submit.prevent="handleLogin">
          <input
            v-model="password"
            type="password"
            placeholder="Enter password"
            class="w-full px-4 py-2 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            autocomplete="current-password"
          />
          <button
            type="submit"
            class="mt-4 w-full bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition duration-200"
          >
            Login
          </button>
          <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
        </form>
      </div>

      <div v-else class="space-y-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">Email Message</h2>
          <textarea
            v-model="localEmailMessage"
            @blur="updateEmailMessage"
            rows="4"
            class="w-full px-4 py-2 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Enter email message..."
          ></textarea>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">Card Messages</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="card in localCardMessages" :key="card.id" class="border border-rose-200 rounded-lg p-4">
              <h3 class="font-semibold text-rose-700 mb-2">Card {{ card.id }}</h3>
              <input
                v-model="card.title"
                @blur="updateCard(card.id)"
                type="text"
                placeholder="Card title"
                class="w-full px-3 py-1 mb-2 border border-rose-300 rounded focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
              <textarea
                v-model="card.message"
                @blur="updateCard(card.id)"
                rows="2"
                placeholder="Card message"
                class="w-full px-3 py-1 border border-rose-300 rounded focus:outline-none focus:ring-1 focus:ring-rose-500"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">Gallery Message</h2>
          <textarea
            v-model="localGalleryMessage"
            @blur="updateGalleryMessage"
            rows="3"
            class="w-full px-4 py-2 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Enter gallery message..."
          ></textarea>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">Gallery Images</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="image in localGalleryImages" :key="image.id" class="border border-rose-200 rounded-lg p-4">
              <h3 class="font-semibold text-rose-700 mb-2">Image {{ image.id }}</h3>
              <input
                v-model="image.caption"
                @blur="updateGalleryImage(image.id)"
                type="text"
                placeholder="Image caption"
                class="w-full px-3 py-1 border border-rose-300 rounded focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <button
            @click="saveAll"
            class="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Save All Changes
          </button>
          <router-link
            to="/"
            class="bg-rose-500 text-white py-2 px-6 rounded-lg hover:bg-rose-600 transition duration-200"
          >
            Go to Site
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useConfigStore } from '@/stores/config'
import type { CardMessage, GalleryImage } from '@/stores/config'

const store = useConfigStore()
const password = ref('')
const error = ref('')
const isAuthenticated = ref(false)

const localEmailMessage = ref('')
const localGalleryMessage = ref('')
const localCardMessages = ref<CardMessage[]>([])
const localGalleryImages = ref<GalleryImage[]>([])

onMounted(() => {
  isAuthenticated.value = store.isAuthenticated
  loadCurrentValues()
})

const loadCurrentValues = () => {
  localEmailMessage.value = store.emailMessage
  localGalleryMessage.value = store.galleryMessage
  localCardMessages.value = [...store.cardMessages]
  localGalleryImages.value = [...store.galleryImages]
}

const handleLogin = () => {
  if (store.authenticate(password.value)) {
    isAuthenticated.value = true
    error.value = ''
    loadCurrentValues()
  } else {
    error.value = 'Invalid password'
  }
}

const updateEmailMessage = () => {
  store.updateEmailMessage(localEmailMessage.value)
}

const updateGalleryMessage = () => {
  store.updateGalleryMessage(localGalleryMessage.value)
}

const updateCard = (id: number) => {
  const card = localCardMessages.value.find(c => c.id === id)
  if (card) {
    store.updateCardMessage(id, card)
  }
}

const updateGalleryImage = (id: number) => {
  const image = localGalleryImages.value.find(img => img.id === id)
  if (image) {
    store.updateGalleryImage(id, image)
  }
}

const saveAll = () => {
  updateEmailMessage()
  updateGalleryMessage()
  localCardMessages.value.forEach(card => updateCard(card.id))
  localGalleryImages.value.forEach(image => updateGalleryImage(image.id))
  alert('All changes saved successfully!')
}
</script>