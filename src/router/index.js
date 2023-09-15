import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsList.vue')
    },
    {
      path: '/add_news',
      name: 'addNews',
      component: () => import('../views/NewsList.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/login_category',
      name: 'loginCategory',
      component: () => import('../views/LoginCategory.vue')
    },
    {
      path: '/login_news',
      name: 'loginNews',
      component: () => import('../views/LoginNews.vue')
    },
  ]
})

export default router
