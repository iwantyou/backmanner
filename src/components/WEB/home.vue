<!--主页 -->
<template>
<div class="webhome hold-transition skin-blue sidebar-mini">
<div class="wrapper">
  <header class="main-header">
    <!-- Logo -->
    <a href="#" class="logo">
      <span class="logo-mini"><b>A</b>LT</span>
      <span class="logo-lg">后台管理系统</span>
    </a>
    <nav class="navbar navbar-static-top">
      <!-- 头部-->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="iconfont icon-xuerentou" v-if=true style="color:pink"></i>
              <img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image" v-else>
              <span class="hidden-xs">{{popname}}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="user-header">
                <i class="iconfont icon-xuerentou" v-if=true style="color:pink"></i>
                <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image" v-else>
                <p>
                 名字描述
                  <small>时间</small>
                </p>
              </li>
              <!-- 菜单主题 -->
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="#">说明</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">说明</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">说明</a>
                  </div>
                </div>
              </li>
              <!-- 餐单底部-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">简要</a>
                </div>
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat">注销</a>
                </div>
              </li>
            </ul>
          </li>
  
        </ul>
      </div>
    </nav>
  </header>
  <!-- 侧边栏-->
   <aside class="main-sidebar">
    <section class="sidebar">
     <ul class="sidebar-menu" data-widget="tree">
        <li class="header" style="font-size:120%;color:#666">欢迎您，{{popname}}</li>
        <li @click="cur(index,item)" v-for="(item, index) in leftnav" :key="index" :class="[{'active' : curindex == index},{'treeview': item.twoname}] ">
           <a href="#">
            <i :class="[          {'iconfont icon-shouye' : item.name == '首页'},
                                  {'iconfont icon-huodongguanli': item.name == '活动管理'},
                                  {'iconfont icon-shujuguanli' : item.name == '投票数据管理'},
                                  {'iconfont icon-daichuli' : item.name == '敏感字处理'},
                                  {'iconfont icon-weibiaoti5' : item.name == '账户管理'}
                                  ] " ></i>
            <span>{{item.name}}</span>
          </a>
        </li>
        <li class="header">LABELS</li>
        <li><a href="#"><i class="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
        <li><a href="#"><i class="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
        <li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
      </ul>
    </section>
    <!-- 结束 -->
  </aside>
  <div class="content-wrapper">
      <firstpage v-if=' name == "首页"'></firstpage>
      <account v-if=' name == "账户管理"'></account>
      <activity v-if=' name == "活动管理"'></activity>
      <bigdata v-if=' name == "投票数据管理"'></bigdata>
      <sensitive v-if=' name == "敏感字处理"'></sensitive>
  </div>
  </div>
</div>

</template>
<script>
import firstpage from './firstpage'
import account from './account'
import activity from './activity'
import bigdata from './data'
import sensitive from './sensitiveword'
export default {
    name:'webhome',
    components:{
     firstpage,//首页组件
     account,//账户管理组件
     activity,//活动管理组件
     bigdata,//大数据组件
     sensitive//敏感字处理组件
    },
    data(){
        return{
          popname:'喜动科技', //欢迎名称
        leftnav:[
               {
                   name:'首页',
                   url:'/webhome'
               },
               {
                  name:'活动管理',
                  url:'#',
                  twoname:[{name:'创建活动',url:'/webactivity'},{name:'白名单管理',url:'/webwhitelist'},
                  {name:'规则设置',url:'/webrule'}]
               },
               {
                   name:'投票数据管理',
                   url:'#',
                   twoname:[{name:'添加投票队伍',url:'/webvote'}]
               },
               {
                   name:'敏感字处理',
                   url:'/websensitiveword'
               },
               {
                   name:'账户管理',
                   url:'#',
                   twoname:[{name:'添加账户',url:'/account'}]
               },
           ], //侧边栏内容
           curindex:0, // 侧边栏的点击索引
           name:'首页'
        }
    },
    methods:{
        cur(index,item){
            this.curindex = index
            this.name = item.name     
        }
    }

}
</script>
<style scoped>
@import '../../assets/web/css/skins/_all-skins.min.css';
@import '../../assets/web/css/AdminLTE.min.css';
.webhome{
    height:100%;
}
.pull-down{
    transform: rotate(-90deg)!important;
    transition: all .6s;
}

</style>
