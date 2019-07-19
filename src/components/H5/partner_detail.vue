<template>
  <div class="container">
    <header>
      <i class="icon iconfont icon-zuo" @click='back()'></i>
      <p>参赛者详情</p>
      <i class="icon iconfont icon-fenxiang- share"></i>
    </header>
    <!-- 轮播图 -->
    <nav>
      <video src controls="controls"></video>
    </nav>
    <div class="content">
      <h5>夕阳红舞蹈队</h5>
      <div class="zan">
        <div class="circle">
         <img v-show="!show" src="../../assets/img/partner_detail/zan@3x.png" alt @click='Show()'/>
          <img v-show='show' src="../../assets/img/partner_detail/yzan@3x.png" alt @click='Show()' />
        </div>
        <p>
          已获得
          <i>1245</i> 票
          <span></span>
        </p>
      </div>

      <div class="item">
        <p>夕阳红舞蹈队成立于2002年,队伍基本由社区退休人员组成,现平均年龄在65岁左右,年纪最长者为73岁,目前队员有13人。</p>
        <img src="../../assets/img/pic/xuan.png" alt />
      </div>
        <button @click="alert()">
          <i class="icon iconfont icon-xaingji"></i>生成海报照片
        </button>
   
    </div>

    <!-- 点击生成海报 -->
    <div class="alert" v-show="flag" @click="close()">
      <div class="a_content">
        <div class="a_center">
           <img src="../../assets/img/pic/xuan.png" alt />
          <div class="a_bottom">
            <div class="ab_top">
              <div class="ab_img">
              </div>
              <p>夕阳红舞蹈队</p>
            </div>
            <div class="b_bottom">
              夕阳红舞蹈队成立于2002年,队伍基本由社区退休人员组成,现平均年龄在65岁左右,年纪最长者为73岁,目前队员有13人。
            </div>
          </div>
        </div>
       <div class="ab_bottom">
         <i>活动时间</i><span>2019.07.01-2019.07.30</span>
       </div>
    
      </div>
    
     
    </div>
  </div>
</template>

<script>
import icon from "@/assets/font/iconfont.js";
export default {
  name: "partner_detail",
  data() {
    return {
      flag: false,
      show:true,
      id: this.$route.params.id,
    };
  },
  created() {
   
    
  },
  mounted() {
     console.log(this.id);
  },
  methods: {
    alert(){
      this.flag=true;
    },
   Show(){
     this.show=!this.show;

   },
    close(){
      this.flag=false;
    },
    back(){
      history.go(-1);
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/partner_detail.css";
</style>
