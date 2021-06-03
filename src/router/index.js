import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login'
import Home from '../components/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component: Home
  }
]


const router = new VueRouter({
  routes,
  mode:'history'
})

//利用vue的导航守卫，在跳转之前，做出判断
router.beforeEach((to,from,next) => {
  /*
  to:要跳转到的路由
  from:跳转之前的路由
  next：放行
   */
  if (to.path === '/login') return next();
  const token = window.sessionStorage.getItem('token')
  if(!token) return next('/login');
  return next();
})


export default router
