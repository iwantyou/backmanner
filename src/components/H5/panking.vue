<template>
  <div class="container">
    <header>
      <i class="icon iconfont icon-zuo" @click="back()"></i>
      <p>排行榜</p>
      <i class="icon iconfont icon-fenxiang- share"></i>
    </header>
    <!-- 轮播图 -->
    <nav>
      <van-swipe :autoplay="3000" indicator-color="white">
       <van-swipe-item v-for='{item,i} in bannerlist' :key='i'>
          <img src="../../assets/img/list/banner.png" />
        </van-swipe-item>
      </van-swipe>
      <div class="rule">活动规则</div>
    </nav>
    <div class="content">
      <h4>
        排行榜
        <span></span>
      </h4>
      <div class="i_content">
        <div class="item" v-for='(item,i) in itemlist' :key='i'>
          <router-link :to="'partner_detail/'+i" >
          <i class="icon iconfont icon-wangguan- wangguan" v-show='i==0'></i>
          <i class="icon iconfont icon-wangguan- wangguan wangguan1" v-show='i==1'></i>
          <i class="icon iconfont icon-wangguan- wangguan wangguan2" v-show='i==2'></i>
          <i :class="i>2?'num1':'num'">{{i++}}</i>
          <div class="i_top">
            <img src="../../assets/img/pic/xuan.png" alt />
          </div>
           </router-link>
          <div class="i_bottom">
            <p>郑州舞者</p>
            <p>
              <i>1234</i>票
            </p>
            <button  @click="zan(i)" v-show="item.status">
              <i class="icon iconfont icon-zan01 xin"></i>给TA点赞
            </button>
             <button v-show="!item.status" class='yizan' >
              您已点赞
            </button>
          </div>
         
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "panking",
  data() {
    return {
      flag: true,
      // banner图列表
      bannerlist: [1,2,3],
      itemlist:{  
       0:{status:true},
       1:{status:true},
       2:{status:true},
       3:{status:true},
       4:{status:true}

      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    back(){
      history.go(-1);
    },
    zan(i){
      this.itemlist[i-1].status=false;
      
      
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/panking.css";
</style>
