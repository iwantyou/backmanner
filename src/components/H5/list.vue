<template>
  <div class="container">
    <header>
      <i class="icon iconfont icon-zuo" @click="back()"></i>
      <p>投票列表</p>
      <i class="icon iconfont icon-fenxiang- share"></i>
    </header>
    <!-- 轮播图 -->
    <nav>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for='{item,i} in bannerlist' :key='i'>
          <img src="../../assets/img/list/banner.png" />
        </van-swipe-item>
      </van-swipe>
    </nav>
    <div class="content">
      <div class="item" v-for='(item,i) in itemlist' :key='i'>
        <img src="../../assets/img/list/item.png" alt />
        <div class="bottom">
          <div class="b_left">
            <p>全民舞动~嗨起来</p>
            <p class="time">
              <i class="icon iconfont icon-iconfront-"></i>2019.2.5-2019.3.15
            </p>
          </div>
          <div class="b_right">
            <router-link to="active_detail/" class="b_right">
              查看活动
              <i class="icon iconfont icon-dashujukeshihuaico- more"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      flag: true,
      // banner图列表
      bannerlist: [1,2,3],
      // 活动列表
      itemlist:[1,2,3]
    };
  },
  created() { 
  },
  mounted() {},
  methods: {
    back() {
      history.go(-1);
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/list.css";
</style>
