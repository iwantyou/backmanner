<!--创建活动 -->
<template>
    <div class="creat" style="min-height:100%;height:100%;">
      <img src="../../assets/web/img/wenxintishi.png" class="img">
      <div class="tips">
        <div>温馨提示</div>
        <div class="small" style="font-size:85%;color:#666;">请认真填写基本活动信息</div>
      </div>
      <div class="input">
       <label for="activity" style="padding-left:10px;">
         <input type="text" id="activity" placeholder="请输入活动名称" required />
       </label>
       </div>
        <div class="input">
       <label for="activity1" style="padding-left:10px;">
         <input type="text" id="activity1" placeholder="负责人姓名" required />
       </label>
       </div>
        <div class="input">
       <label for="activity2" style="padding-left:10px;">
         <input type="text" id="activity2" placeholder="负责人电话" required />
       </label>
       </div>
       <div class="updownload" >
         <label style="display:inline-block;cursor:pointer;" for="up">
        <div style="width:8rem;height:8rem;background:#FAFAFA;border:1px solid #ccc;
border-radius: 2px;">
          <div style="text-align:center;font-size:1.5rem;color:#ccc">
            <img class="img-add" src="../../assets/web/img/iconfont707.png" />
          </div>
          <div class="text-center">上传活动封面</div> 
        </div>
        </label>
        <input type="file" id="up" style="display:none;" accept="image/png,image/jpg,image/jpeg" />
       </div>
       <div class="updownload"  draggable="ture" @drop="drop($event)">
         <label style="display:inline-block;cursor:pointer;" for="drop">
          <div class="drag">
             <img class="db-img-bl" src="../../assets/web/img/wenjian.png" />
             <p>点击或将文件拖拽这里上传</p>
             <p>支持扩展名: .rar .zip .doc .docx .pdf .jpg</p>
          </div>
          </label>
          <input type="file" id="drop" accep="*" />
       </div>
       <div class="acti-time">
         <input type="text" placeholder="开始时间" required />
         <span>-----</span>
         <input type='text' placeholder="结束时间" required />
       </div>
       <div class="activi-content">
         <textarea class="text-content" placeholder="活动内容"></textarea>
       </div>
       <div class="but">
         <div>提交</div>
       </div>
    </div>
</template>
<script>
export default {
    name:'webaddteam',
    data(){
        return{

        }
    },
    methods:{
    drop (e) {
      e.preventDefault()
      let length = e.dataTransfer.flies.length
      if (length > 0) {
        alert('上传成功')
      }
    }
    }
}
</script>
<style scoped>
@import '../../assets/web/css/addteam.css';
</style>


