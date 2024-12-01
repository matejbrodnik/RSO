import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      // component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    
  ],
})

export default router
