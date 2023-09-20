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

router.beforeEach((to, from, next) => {

  const isLogin = sessionStorage.getItem('isLogin') === 'true';

  if (!isLogin && (to.name === 'loginCategory' || to.name === 'loginNews')) {
    // 未登入但試圖訪問 'loginCategory' 或 'loginNews' 頁面，導向登入畫面
    next('login');
  } else if (isLogin && to.name === 'login') {
    // 已登入，但又試圖訪問登入頁面，將會導向首頁
    next('/');
  } else {
    // 其他隨意進入
    next();
  }
})

export default router
