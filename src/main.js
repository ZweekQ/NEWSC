import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入全局样式表
import './assets/css/global.css'
//导入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入图标
import './assets/fonts/iconfont.css'
//导入axios
import axios from 'axios'
axios.defaults.baseURL="http://127.0.0.1:8888/api/private/v1/"
Vue.prototype.$http = axios
//注册ElementUI
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
