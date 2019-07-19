// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
//引入表格
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 引入resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// Vue.http.options.root = "http://api.laoxianyu.vip/"
Vue.http.options.emulateJSON = true;
import router from './router'
// 引入css
import "@/assets/css/common.css"
// 引入字体库
import "@/assets/font/iconfont.css"
// web 引入字体库
import "@/assets/web/iconfont/iconfont.css"
// 轮播图引入
import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
Vue.use(wcSwiper);

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
