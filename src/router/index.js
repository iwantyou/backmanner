import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/H5/list'
// 活动列表
import active_detail from '@/components/H5/active_detail'
// 活动详情
import panking from '@/components/H5/panking'
// 活动详情
import participate from '@/components/H5/participate'
// 参与活动
import partner_detail from '@/components/H5/partner_detail'
// 参赛者详情


//web后台管理页面
// 登陆页面
import weblogin from '@/components/WEB/login'
// 主页页面
import webhome  from '@/components/WEB/home'
// 创建活动页面
import webcreat from '@/components/WEB/creatactivity'
// 规则设置
import webrule  from '@/components/WEB/rule'
// 白名单
import webwhite from '@/components/WEB/whitelist'
// 添加队伍
import webaddteam from '@/components/WEB/addteam'
// 添加账户
import webaddcount from '@/components/WEB/addcount'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },    
    {
       path: '/active_detail',
       name: 'active_detail',
       component: active_detail
     },
     {
      path: '/panking',
      name: 'panking',
      component: panking
    },
    {
      path:'/participate',
      name:'participate',
      component:participate
    },
    {
      path:'/partner_detail/:id',
      name:'partner_detail',
      component:partner_detail
    },

    {
      path:'/web/login',
      name:'weblogin',
      component: weblogin
    },
    {
      path: '/web/home',
      name:'webhome',
      component:webhome
    },
    {
      path: '/web/creat',
      name: 'webcreat',
      component: webcreat
    },
    {
      path: '/web/rule',
      name: 'webrule',
      component: webrule
    },
    {
      path: '/web/whitelist',
      name: 'webwhite',
      component: webwhite
    },
    {
      path: '/web/addteam',
      name: 'webaddteam',
      component: webaddteam
    },
    {
      path:'/web/addcount',
      name:'webaddcount',
      component: webaddcount
    }
  ]
})
