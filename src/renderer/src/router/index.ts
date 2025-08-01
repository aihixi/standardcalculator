import { createRouter, createWebHistory } from 'vue-router'
import Home from '@renderer/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home // 这里就是起始页
  },
  // 其他路由
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router