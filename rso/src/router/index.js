import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Location from '../components/Location.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Location,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      // component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    
  ],
})

export default router
