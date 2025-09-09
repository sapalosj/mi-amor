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
  const emailMessage = ref(`Mi amor, on this special day may we remember all the moments that brought us closer together, and even the challenges that only made our bond stronger. You are not just my love, but my safe place, my joy, my bestfriend, and my greatest blessing.`)
  const galleryMessage = ref('Six years of beautiful memories together...')
  const musicPlaying = ref(false)
  const audioElement = ref<HTMLAudioElement | null>(null)
  
  const cardMessages = ref<CardMessage[]>(
    JSON.parse(localStorage.getItem('cardMessages') || JSON.stringify([
      { id: 1, title: 'First Year', message: 'The beginning of our journey, butterflies in my stomach, finally my long time highschool crush is mine feels unreal', imageUrl: '/images/card1.jpg' },
      { id: 2, title: 'Adventures', message: "All our travels and food trips, no matter how big or small, have become precious memories that I will treasure forever. But even more than the places we’ve been or the meals we’ve shared, it is your hand in mine and your presence by my side that makes every moment unforgettable. With you, the simplest days turn into the most beautiful memories ", imageUrl: '/images/card2.jpg' },
      { id: 3, title: 'Support', message: 'One thing I really love about us is the way we support each other, not just in our hobbies and passions, but in every part of life. You are my safe place, and with you by my side, even the hardest days feel easier and the best days feel even brighter', imageUrl: '/images/card3.jpg' },
      { id: 4, title: 'Growth', message: 'Throughout the years, our relationship has faced challenges and differences, but one thing has always been clear,it has brought us growth and maturity, that molds for next chapters of our relationship.', imageUrl: '/images/card4.jpg' },
      { id: 5, title: 'Dreams', message: "Remembering all the dreams we’ve shared,the family we want to build, the home we long to create, and the safe space we promised each other.", imageUrl: '/images/card5.jpg' },
      { id: 6, title: 'Forever', message: 'The next chapter of our journey that we both look forward to, in God’s perfect time,the day we finally tie the knot. Mi amore, always remember this line “Loved you once, love you still, always have, always will”', imageUrl: '/images/card6.jpg' }
    ]))
  )

  const galleryImages = ref<GalleryImage[]>(
    JSON.parse(localStorage.getItem('galleryImages') || JSON.stringify([
      { id: 1, url: '/images/gallery1.jpg', caption: 'Our first travel' },
      { id: 2, url: '/images/gallery2.jpg', caption: 'Simple, but a truly special trip' },
      { id: 3, url: '/images/gallery3.jpg', caption: 'Our first theater together' },
      { id: 4, url: '/images/gallery4.jpg', caption: 'Random moments' },
      { id: 5, url: '/images/gallery5.jpg', caption: 'My Safe Space' },
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

  const initMusic = () => {
    if (!audioElement.value) {
      audioElement.value = new Audio('/music/captivated.mp3')
      audioElement.value.loop = true
      audioElement.value.volume = 0.5
    }
    return audioElement.value
  }

  const playMusic = () => {
    const audio = initMusic()
    audio.play().then(() => {
      musicPlaying.value = true
    }).catch(error => {
      console.log('Audio playback failed:', error)
    })
  }

  const pauseMusic = () => {
    if (audioElement.value) {
      audioElement.value.pause()
      musicPlaying.value = false
    }
  }

  const toggleMusic = () => {
    if (musicPlaying.value) {
      pauseMusic()
    } else {
      playMusic()
    }
  }

  return {
    emailMessage,
    galleryMessage,
    cardMessages,
    galleryImages,
    isAuthenticated,
    musicPlaying,
    authenticate,
    updateEmailMessage,
    updateGalleryMessage,
    updateCardMessage,
    updateGalleryImage,
    playMusic,
    pauseMusic,
    toggleMusic
  }
})