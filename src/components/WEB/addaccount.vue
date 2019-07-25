<!-- 添加账户 -->
<template>
	<div class="addcount">
		<div class="con">
			<p class="text-center">创建账户</p>
			<div class="name">
				<label for="user" class="com-label">姓名</label>
				<input type="text" id="user" v-model="name" placeholder="请输入姓名" title="请填写此字段" required />
			</div>
			<div class="mob">
				<label for="mobile" class="com-label">+86</label>
				<input type="text" id="mobile" v-model="mobile" placeholder="请输入手机号" title="请填写此字段" required />
			</div>
			<div class="pass">
				<label for="password" class="com-label">密码</label>
				<input
					type="text"
					id="password"
					v-model="password"
					placeholder="初始化生成"
					title="请填写此字段"
					minlength="8"
					maxlength="20"
					required
				/>
			</div>
			<div
				class="btn btn-success text-center"
				@click="addAccount"
				style="display:block;width:60%;margin:0 auto"
			>提交</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "addaccount",
	data() {
		return {
			name: "",
			mobile: "",
			password: ""
		};
	},
	created() {},
	mounted() {},
	methods: {
		addAccount() {
			if (!this.name || !this.mobile || !this.password) {
				return alert("请填写完整");
			}
			this.$post("/api/admin/add", {
				name: this.name,
				mobile: this.mobile,
				password: this.password
			})
				.then(res => {
					console.log(res)
					if (res.code == 0) {
						this.$router.push("/web/account");
					} else {
						alert(res.msg);
					}
				})
				.catch(err => {});
		}
	}
};
</script>
<style scoped>
@import "../../assets/web/css/addcount.css";
</style>

