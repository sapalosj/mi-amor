import { createRouter, createWebHistory } from 'vue-router'
import PasscodePage from '@/pages/PasscodePage.vue'
import EmailPage from '@/pages/EmailPage.vue'
import CardsPage from '@/pages/CardsPage.vue'
import GalleryPage from '@/pages/GalleryPage.vue'
import AdminConfig from '@/pages/AdminConfig.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'passcode',
      component: PasscodePage
    },
    {
      path: '/mail',
      name: 'mail',
      component: EmailPage
    },
    {
      path: '/cards',
      name: 'cards',
      component: CardsPage
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryPage
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminConfig
    }
  ]
})

export default router