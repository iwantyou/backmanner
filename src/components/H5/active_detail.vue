<template>
  <div class="container">
    <header>
      <i class="icon iconfont icon-zuo" @click='back()'></i>
      <p>活动介绍</p>
      <i class="icon iconfont icon-fenxiang- share"></i>
    </header>
    <!-- 轮播图 -->
    <nav>
      <img src="../../assets/img/banner.png" />
      <div class="bottom">
        <p class="b_left">
          <i class="icon iconfont icon-shimingrenzheng"></i>
          <router-link to='/participate'><i>我要参与</i></router-link> 
        </p>
        <p class="b_right">
          <i class="icon iconfont icon_index-paihang icon-icon_index-paihang"></i>
           <router-link to='/panking'><i>票数排行</i></router-link> 
        </p>
      </div>
    </nav>
    <div class="content">
      <h4>
        活动介绍
        <span></span>
      </h4>
      <div class="item">
        <div class="title">
          <span></span>
          <span>主办方</span>
        </div>
        <div class="i_content">
          <p>招商银行河南总行</p>
        </div>
      </div>
      <div class="item">
        <div class="title">
          <span></span>
          <span>活动规则</span>
        </div>
        <div class="i_content">
          <p>1.参赛者上传信息,严禁盗用他人照片等信息。</p>
          <p>2.禁止参赛作品出现任何非法内容、言论不当等行为。</p>
          <p>3.严禁任何作弊行为,系统发现会自动对票数清空。</p>
          <p>4.作品设计著作权,肖像权等法律责任由活动参与者自行承担法律责任。</p>
          <p>5.以上行为一经发现,主办方有权删除照片并取消参赛资格。</p>
          <p>6.禁止加入诱导关注/诱导分享内容。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "active_detail",
  data() {
    return {
      flag: true
    };
  },
  created() {},
  mounted() {},
  methods: {
    back(){
      history.go(-1)
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/list_detail.css";
</style>
