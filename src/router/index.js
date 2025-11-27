import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/Blog.vue')
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('../views/Resume.vue')
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('../views/BlogPost.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
