import Vue from 'vue'
import VueRouter from 'vue-router'
import Lockers from '@/components/Lockers.vue'
import Assign from '@/components/Assign.vue'
import Buefy from 'buefy'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(Buefy)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Lockers },
  { path: '/assign', component: Assign },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({ routes })

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
