import ExplorerView from '@/views/ExplorerView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ExplorerView,
    },
  ],
})

export default router
