<template>
  <div class="container">
    <header>
      <i class="icon iconfont icon-zuo" @click='back()'></i>
      <p>报名参加活动</p>
      <i class="icon iconfont icon-fenxiang- share"></i>
    </header>
    <nav>
      <img src="../../assets/img/participate/tip.png" alt />
      <div class="tip">
        <p>请仔细填写下列信息与投票。</p>
        <p>请保证填写信息的真实性。</p>
      </div>
    </nav>
    <div class="content">
      <form action>
        <div class="item">
          <p>队伍名称</p>
          <input type="text" placeholder="请输入队伍名称"  name='name'/>
        </div>
        <div class="item">
          <p>负责人</p>
          <input type="text" placeholder="请输入负责人姓名" name='personal' />
        </div>
        <div class="item">
          <p>联系电话</p>
          <input type="phone" placeholder="请输入负责人联系电话" name='phone' />
        </div>
        <div class="item">
          <p>上传精彩图片</p>
          <label class="ui_button ui_button_primary" for="x">
               <div id="pic">
                <p></p>
                <p></p>
              </div>
          </label>
          <input type="file" id="x" name="take-picture" class="take-picture" accept="image/*" @change='uploadImg()'/>
        </div>
        <div class="item">
          <p>上传参赛视频</p>
          <label class="ui_button ui_button_primary" for="y">
            <div id="videoImg">
              <div class="top">
                <p></p>
                <p></p>
              </div>
              <div class="bottom">
                <p>点击或将文件拖拽到这里上传</p>
                <p>支持的拓展名MP3,MP4......</p>
              </div>
            </div>
          </label>
          <input
            type="file"
            id="y"
            name="take-video"
            class="take-video"
            accept="video/*"
            @change="upload()"
          />

          <video id="video" src='' controls="controls" style="display:none;"></video>
        </div>
        <div class="item">
          <p>活动宣言</p>
          <textarea name='sign' id cols="50" rows="6" placeholder="100-300字"></textarea>
        </div>
      </form>
      <button @click="submit()" class="submit">报&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</button>
    </div>

    <div class="alert" v-show="show">
      <div class="alert_content">
        <img class="close" src="../../assets/img/participate/close.png" alt=""  @click="hidden()">
        <h5>
          温馨提示
          <span></span>
        </h5>
        <div class="a_center">
          <i class="icon iconfont icon-dui- dui"></i>
          <p>您的报名资料已提交谢谢参与</p>
        </div>
        <button @click="hidden()" class="confirm">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</button>
      </div>
    </div>
 
  </div>
</template>

<script>
export default {
  name: "participate",
  data() {
    return {
      flag: true,
      fileList: [],
      show: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    alert() {
      this.show = true;
    },
    hidden() {
      this.show = false;
    },
    upload() {
      // 获取上传的视频
      console.log($("#y")[0].files[0]);
    },
    uploadImg() {
      // 获取上传的图片
      console.log($("#x")[0].files[0]);
    },
    back(){
      history.go(-1)
    },
    // 提交的表单信息
    submit(){
      var name=$("input[name='name']").val();
      var personal=$("input[name='personal']").val();
      var phone=$("input[name='phone']").val();
      var sign=$("textarea[name='sign']").val();
      
      

    }
  }
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/participate.css";
</style>
