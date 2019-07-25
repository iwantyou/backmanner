<!---登录-->
<template>
	<div class="bg-dark">
		<div class="container">
			<div class="card card-login mx-auto mt-5">
				<div class="card-header text-center">登录</div>
				<div class="card-body">
					<form>
						<div class="form-group form-horizontal">
							<div class="form-label-group">
								<label for="username">用户名</label>
								<input
									type="text"
									id="username"
									v-model="username"
									class="form-control"
									placeholder="请输入用户名/手机号"
									required="required"
									autofocus="autofocus"
								/>
							</div>
						</div>
						<div class="form-group">
							<div class="form-label-group">
								<label for="inputPassword">密码</label>
								<input
									type="password"
									id="inputPassword"
									v-model="password"
									class="form-control"
									placeholder="请输入密码"
									required="required"
								/>
							</div>
						</div>
						<!-- <div class="form-group">
            <div class="checkbox">
              <label>
                <input type="checkbox" value="remember-me">
                记住密码
              </label>
            </div>
						</div>-->
						<a class="btn btn-primary btn-block" href="javascript:;" @click="login">登录</a>
					</form>
					<!-- <div class="text-center">
						<a class="d-block small mt-3" href>注册</a>
						<a class="d-block small" href>忘记密码?</a>
					</div>-->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Cookies from "js-cookie";
export default {
	name: "weblogin",
	data() {
		return {
			username: "15378700683",
			password: "00683"
		};
	},
	methods: {
		login() {
			const username = this.username;
			const password = this.password;
			console.log(username, password);
			if (!username || !password)
				return alert("登录失败：用户名和密码不能为空");
			this.$post("/api/admin/login", { username, password })
				.then(res => {
					if (res.code == 0) {
						const { token } = res.data;
						Cookies.set("jtoken", token);
						let redirect = decodeURIComponent(
							this.$route.query.redirect || "/web/home"
						);
						this.$router.push({ path: redirect });
					} else {
						return alert(res.msg);
					}
				})
				.catch(err => {});
		}
	}
};
</script>
 <style  scoped>
@import "../../assets/web/css/weblogin.css";
</style>


