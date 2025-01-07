import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Location from '../components/Location.vue'
import Weather from '../components/Weather.vue'
import LocationList from '../components/LocationList.vue'

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
      path: '/',
      name: 'login1',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/weather',
      name: 'weather',
      component: Weather,
    },
    {
      path: '/locationlist',
      name: 'locationlist',
      component: LocationList,
    },
  ],
})

export default router
