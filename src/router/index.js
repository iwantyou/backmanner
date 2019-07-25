import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import Load from '@/components/H5/loading'
// 加载动画
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
import success from '@/components/H5/success'
// 投票成功
import participate_best from '@/components/H5/participate_best'
// 报名最佳助威人
import rule from '@/components/H5/rule'
// 规则
import history_comment from '@/components/H5/history_comment'
// 点赞历史
import history_upload from '@/components/H5/history_upload'
// 上传历史
import info from '@/components/H5/info'
// 个人信息展示
import cheer_panking from '@/components/H5/cheer_panking'
//助威人排行榜
import myinfo from '@/components/H5/myinfo'
// 个人中心
import mysign from '@/components/H5/mysign'
//我的报名
import match from '@/components/H5/match'
//赛事详情


//web后台管理页面
// 总布局
import weblayout from '@/components/WEB/layout'
// 登陆页面
import weblogin from '@/components/WEB/login'
// 主页页面
import webhome from '@/components/WEB/firstpage'
// 活动管理
import webactivity from '@/components/WEB/activity'
// 创建活动页面
import webaddactivity from '@/components/WEB/addactivity'
// 投票数据管理
import webteam from '@/components/WEB/team'
// 添加队伍
import webaddteam from '@/components/WEB/addteam'
// 敏感字处理
import websensitiveword from '@/components/WEB/sensitiveword'
// 敏感字设置
import setsensitive from '@/components/WEB/setsensitive'
// 账户管理
import webaccount from '@/components/WEB/account'
// 添加账户
import webaddaccount from '@/components/WEB/addaccount'
// 规则设置
import webrule from '@/components/WEB/rule'
// 白名单
import webwhitelist from '@/components/WEB/whitelist'
// 添加白名单
import webaddwhitelist from '@/components/WEB/addwhitelist'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Load',
      component: resolve => require(['@/components/H5/loading'], resolve)

    },
    {
      path: '/list',
      name: 'list',
      component: resolve => require(['@/components/H5/list'], resolve)
    },
    {
      path: '/active_detail/:voteId',
      name: 'active_detail',
      component: resolve => require(['@/components/H5/active_detail'], resolve)
    },
    {
      path: '/panking/:voteId',
      name: 'panking',
      component: resolve => require(['@/components/H5/panking'], resolve)
    },
    {
      path: '/participate/:voteId',
      name: 'participate',
      component: resolve => require(['@/components/H5/participate'], resolve)
    },
    {
      path: '/partner_detail/:itemId',
      name: 'partner_detail',
      component: resolve => require(['@/components/H5/partner_detail'], resolve)
    },
    {
      path: '/success/:voteId/:bindId/:self_registration',
      name: 'success',
      component: resolve => require(['@/components/H5/success'], resolve)
    },
    {
      path: '/participate_best/:voteId',
      name: 'participate_best',
      component: resolve => require(['@/components/H5/participate_best'], resolve)
    },
    {
      path: '/rule/:voteId',
      name: 'rule',
      component: resolve => require(['@/components/H5/rule'], resolve)
    },
    {
      path: '/history_comment',
      name: 'history_comment',
      component: resolve => require(['@/components/H5/history_comment'], resolve)
    },
    {
      path: '/history_upload',
      name: 'history_upload',
      component: resolve => require(['@/components/H5/history_upload'], resolve)
    },
    {
      path: '/info/:votedId',
      name: 'info',
      component: resolve => require(['@/components/H5/info'], resolve)
    },
    {
      path: '/cheer_panking/db3937f8ed7643d3808c2bacefcb8e0c',
      name: 'cheer_panking',
      component: resolve => require(['@/components/H5/cheer_panking'], resolve)
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component: resolve => require(['@/components/H5/myinfo'], resolve)
    },
    {
      path: '/mysign',
      name: 'mysign',
      component: resolve => require(['@/components/H5/mysign'], resolve)
    },
    {
      path: '/match',
      name: 'match',
      component: resolve => require(['@/components/H5/match'], resolve)
    },
    //web页面
    {//登录页面
      path: '/web/login',
      name: 'weblogin',
      component: weblogin
    },
    {
      path: '/web',
      component: weblayout,
      redirect: '/web/home',
      children: [
        {//主页
          path: 'home',
          name: 'home',
          component: webhome,
          meta: {
            requireAuth: true
          }
        },
        {//活动管理
          path: 'activity',
          name: 'activity',
          component: webactivity

        },
        {//添加活动
          path: 'addactivity/:voteId?',
          name: 'addactivity',
          component: webaddactivity,
          meta: {
            requireAuth: true
          }
        },
        {//参赛队伍
          path: 'team/:voteId?',
          name: 'team',
          component: webteam
        },
        {//添加队伍
          path: 'addteam/:voteId',
          name: 'addteam',
          component: webaddteam,
          meta: {
            requireAuth: true
          }
        },
        {//敏感字
          path: 'sensitiveword',
          name: 'sensitiveword',
          component: websensitiveword
        },{//敏感字设置
          path: 'setsensitive',
          name: 'setsensitive',
          component: setsensitive,
          meta: {
            requireAuth : true
          }
        },
        {//账户管理
          path: 'account',
          name: 'account',
          component: webaccount,
          meta: {
            requireAuth: true
          }
        },
        {//添加账户
          path: 'addaccount',
          name: 'addaccount',
          component: webaddaccount,
          meta: {
            requireAuth: true
          }
        },
        {//规则设置
          path: 'rule/:voteId',
          name: 'rule',
          component: webrule,
          meta: {
            requireAuth: true
          }
        },
        {//白名单设置
          path: 'whitelist/:voteId',
          name: 'whitelist',
          component: webwhitelist,
          meta: {
            requireAuth: true
          }
        },
        {//添加白名单
          path: 'addwhitelist',
          name: 'addwhitelist',
          component: webaddwhitelist,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
});



// 验证 token，存在才跳转
router.beforeEach((to, from, next) => {
  // next()
  let token = Cookies.get('jtoken');
  if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/web/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router;