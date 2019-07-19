<!-- 添加账户 -->
<template>
<div class="addcount">
    <div class="con">
        <p class="text-center">创建账户</p>
    <div class="name">
        <label for="user" class="com-label">姓名</label>
        <input type="text" id="user" placeholder="请输入姓名" title="请填写此字段" required/>
    </div>
    <div class="mob">
        <label for="mobile" class="com-label">+86</label>
        <input type="text" id="mobile" placeholder="请输入手机号" title="请填写此字段" required/>
        
    </div>
    <div class="pass">
        <label for="password" class="com-label">密码</label>
        <input type="text" id="password" placeholder="初始化生成" title="请填写此字段" required />
    </div>
    <div class="btn btn-success text-center" style="display:block;width:60%;margin:0 auto">提交</div>
    </div>
</div>
</template>
<script>
export default {
    name:'addcount',
}
</script>
<style scoped>
@import '../../assets/web/css/addcount.css';
</style>

