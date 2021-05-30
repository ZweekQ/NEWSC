import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
]

const router = new VueRouter({
  routes
})

export default router
