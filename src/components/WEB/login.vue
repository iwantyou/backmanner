<!---登录--->
<template>
<div class="bg-dark">
  <div class="container">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header text-center">登录</div>
      <div class="card-body">
        <form>
          <div class="form-group form-horizontal">
            <div class="form-label-group">
                <label for="inputEmail">用户名</label>
              <input type="email" id="inputEmail" class="form-control" placeholder="请输入用户名" required="required" autofocus="autofocus">
            </div>
          </div>
          <div class="form-group">
            <div class="form-label-group">
                <label for="inputPassword">密码</label>
              <input type="password" id="inputPassword" class="form-control" placeholder="请输入密码" required="required">
            </div>
          </div>
          <div class="form-group">
            <div class="checkbox">
              <label>
                <input type="checkbox" value="remember-me">
                记住密码
              </label>
            </div>
          </div>
          <a class="btn btn-primary btn-block" href="/#/web/home">Login</a>
        </form>
        <div class="text-center">
          <a class="d-block small mt-3" href="">注册</a>
          <a class="d-block small" href="">忘记密码?</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default{
    name: 'weblogin',
    data(){
        return{
         
        }
    }
}
</script>
 <style  scoped>
@import "../../assets/web/css/weblogin.css";
</style>


