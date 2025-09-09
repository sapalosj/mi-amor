import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface CardMessage {
  id: number
  title: string
  message: string
  imageUrl: string
}

export interface GalleryImage {
  id: number
  url: string
  caption: string
}

export const useConfigStore = defineStore('config', () => {
  const emailMessage = ref(localStorage.getItem('emailMessage') || 'My dearest love, on this special day...')
  const galleryMessage = ref(localStorage.getItem('galleryMessage') || 'Six years of beautiful memories together...')
  
  const cardMessages = ref<CardMessage[]>(
    JSON.parse(localStorage.getItem('cardMessages') || JSON.stringify([
      { id: 1, title: 'First Year', message: 'The beginning of our journey...', imageUrl: '/images/card1.jpg' },
      { id: 2, title: 'Adventures', message: 'All the places we\'ve been...', imageUrl: '/images/card2.jpg' },
      { id: 3, title: 'Laughter', message: 'The joy you bring to my life...', imageUrl: '/images/card3.jpg' },
      { id: 4, title: 'Growth', message: 'How we\'ve grown together...', imageUrl: '/images/card4.jpg' },
      { id: 5, title: 'Dreams', message: 'Our future together...', imageUrl: '/images/card5.jpg' },
      { id: 6, title: 'Forever', message: 'My love for you is eternal...', imageUrl: '/images/card6.jpg' }
    ]))
  )

  const galleryImages = ref<GalleryImage[]>(
    JSON.parse(localStorage.getItem('galleryImages') || JSON.stringify([
      { id: 1, url: '/images/gallery1.jpg', caption: 'Our first date' },
      { id: 2, url: '/images/gallery2.jpg', caption: 'That special trip' },
      { id: 3, url: '/images/gallery3.jpg', caption: 'Celebrating together' },
      { id: 4, url: '/images/gallery4.jpg', caption: 'Everyday moments' },
      { id: 5, url: '/images/gallery5.jpg', caption: 'Adventures await' },
      { id: 6, url: '/images/gallery6.jpg', caption: 'Forever and always' }
    ]))
  )

  const isAuthenticated = ref(false)

  const authenticate = (password: string): boolean => {
    if (password === 'miamor123') {
      isAuthenticated.value = true
      return true
    }
    return false
  }

  const updateEmailMessage = (message: string) => {
    emailMessage.value = message
    localStorage.setItem('emailMessage', message)
  }

  const updateGalleryMessage = (message: string) => {
    galleryMessage.value = message
    localStorage.setItem('galleryMessage', message)
  }

  const updateCardMessage = (id: number, message: Partial<CardMessage>) => {
    const index = cardMessages.value.findIndex(card => card.id === id)
    if (index !== -1) {
      cardMessages.value[index] = { ...cardMessages.value[index], ...message }
      localStorage.setItem('cardMessages', JSON.stringify(cardMessages.value))
    }
  }

  const updateGalleryImage = (id: number, image: Partial<GalleryImage>) => {
    const index = galleryImages.value.findIndex(img => img.id === id)
    if (index !== -1) {
      galleryImages.value[index] = { ...galleryImages.value[index], ...image }
      localStorage.setItem('galleryImages', JSON.stringify(galleryImages.value))
    }
  }

  return {
    emailMessage,
    galleryMessage,
    cardMessages,
    galleryImages,
    isAuthenticated,
    authenticate,
    updateEmailMessage,
    updateGalleryMessage,
    updateCardMessage,
    updateGalleryImage
  }
})