// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入vuex vue-router
import router from './router'
import store from './store'

import $ from 'jquery'
import axios from 'axios';
// 引入iview  ui框架
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// 引入3d轮播图组件
import Carousel3d from 'vue-carousel-3d'

Vue.config.productionTip = false
Vue.prototype.$url = '/fullStack'
Vue.prototype.$routerStore = store


Vue.use(iView)
Vue.use(Carousel3d)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

