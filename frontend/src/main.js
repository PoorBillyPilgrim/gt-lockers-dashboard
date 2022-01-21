import Vue from 'vue'
import VueRouter from 'vue-router'
// insert routes here
import Buefy from 'buefy'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(Buefy)

Vue.config.productionTip = false

/*const routes = [
  { path: '/', component: Lockers },
  { path: '/assign', component: Assign },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({ routes })*/

new Vue({
  render: h => h(App),
  // router
}).$mount('#app')
