import Vue from 'vue'
import VueRouter from 'vue-router'
import LockerTabs from '@/components/LockerTabs.vue'
import LockersAssign from '@/components/LockersAssign.vue'
import Buefy from 'buefy'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(Buefy)

Vue.config.productionTip = false

const routes = [
  { 
    path: '/lockers', 
    component: LockerTabs,
    props: { title: "Lockers"}
  },
  { 
    path: '/assign',
    component: LockersAssign,
    props: { title: "Find Available Locker"}
  },
  { path: '*', redirect: '/lockers' }
]

const router = new VueRouter({ routes })

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
