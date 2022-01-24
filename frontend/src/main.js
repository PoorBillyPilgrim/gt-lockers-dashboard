import Vue from 'vue'
import VueRouter from 'vue-router'
import LockersDashboard from '@/components/LockersDashboard.vue'
import LockersAssign from '@/components/LockersAssign.vue'
import Buefy from 'buefy'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(Buefy)

Vue.config.productionTip = false

const routes = [
  { 
    path: '/', 
    component: LockersDashboard,
    props: { title: "Dashboard"}
  },
  { 
    path: '/assign',
    component: LockersAssign,
    props: { title: "Find Available Locker"}
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({ routes })

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
