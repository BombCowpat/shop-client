import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import store from '@/store'
import SliderLoop from '@/components/sliderLoop'
import '@/mock/mockServer'

// import * as API from '@/api'
// API.reqGoodsList({})


Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)
Vue.component('SliderLoop',SliderLoop)

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  el:'#app',
  render: h => h(App),
  router,
  store
})
