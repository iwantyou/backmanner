// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'


import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import { get, post, upload } from './components/api/require'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$upload = upload;
import async from 'async';
Vue.prototype.$async = async;

//bootstrap全局引入
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// 引入 ele
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
 import '@/assets/web/css/defaultele.css';
//引入表格
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// web 引入字体库
import "@/assets/web/iconfont/iconfont.css"

import router from './router'
// 引入css
import "@/assets/css/common.css"
// 引入字体库
import "@/assets/font/iconfont.css"
// 轮播图引入
import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
Vue.use(wcSwiper);



// 引入全局过滤器
import moment from 'moment'
import { verify } from 'crypto';
Vue.filter('dataFormat', function (datastr, pattern = "YYYY-MM-DD") {
  // 使用node中的moment.js
  return moment(datastr).format(pattern)

})

Vue.config.productionTip = false
// Vue.directive('title', {
//   inserted: function (el, binding) {
//     document.title = el.dataset.title
//   }
// });
// 可以使相应页面显示相应的title

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
