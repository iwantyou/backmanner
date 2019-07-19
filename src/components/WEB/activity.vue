<!---活动基本信息管理--->
<template>
    <div class="activity">
   <webheader :title="navname" :name="name"></webheader>
   <div class="list">
     <div class="list-item">
      <div class="list-items" v-for="(item, index) in activitydata" :key="index">
       <img class="db-block fl" :src="item.imgurl" >
       <div class="content-right flex">
         <div class=" div le flex-col">
         <div class="title">{{item.title}}</div>
         <div class="des">{{item.des}}</div>
         <div class="time">开始时间:{{item.starttime}}结束时间:{{item.endtime}}</div>
         <div v-if="item.state == 1">
           <span>参赛数量：{{item.joinmount}}</span>
           <span>总投票数量：{{item.vote}}</span>
         </div>
         </div>
         <div class="cen div" v-html="item.state == 0 ? '未发布':'已发布' "></div>
         <div class="rig div" v-if="item.state == 1" >
             <ul>
               <li @click="$router.push('/web/rule')">规则设置</li>
               <li @click="$router.push('/web/whitelist')">白名单</li>
               <li @click="$router.push('/web/rule')">编辑</li>
               <li @click="$router.push('/web/rule')">删除</li>
             </ul>
         </div>
       </div>
      </div>
     </div>
   </div>
   <div class="footer-elp text-center">
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li>
                <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li>
                <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
</nav>
    </div>
 </div>
</template>
<script>
import webheader from './header'
export default {
    name:'activity',
    components:{
        webheader
    },
    data () {
    return {
        navname:'creat',
        name:'创建活动',
      activitydata: [
        {
          imgurl: '../../assets/images/backg.png',
          title: '标题1',
          des: '这是介绍项目的描述',
          starttime: '2019-08-01',
          endtime: '2019-09-01',
          state: 0, // 0代表未发布   1代表已发布
          joinmount: 100,
          vote: 100
        },
        {
          imgurl: '../../assets/images/backg.png',
          title: '标题2',
          des: '这是介绍项目的描述',
          starttime: '2019-08-01',
          endtime: '2019-09-01',
          state: 1, // 0代表未发布   1代表已发布
          joinmount: 100,
          vote: 100
        },
        {
          imgurl: '../../assets/images/backg.png',
          title: '标题3',
          des: '这是介绍项目的描述',
          starttime: '2019-08-01',
          endtime: '2019-09-01',
          state: 0, // 0代表未发布   1代表已发布
          joinmount: 100,
          vote: 100
        },
        {
          imgurl: '../../assets/images/backg.png',
          title: '标题4',
          des: '这是介绍项目的描述这是介绍项目的描述这是介绍项目的描述',
          starttime: '2019-08-01',
          endtime: '2019-09-01',
          state: 0, // 0代表未发布   1代表已发布
          joinmount: 100,
          vote: 100
        }
      ]
    }
  }
}
</script>
<style scoped>
@import '../../assets/web/css/activity.css';
</style>
