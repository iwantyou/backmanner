<template>
	<div class="loading">
		<img src="../../assets/img/load.gif" alt />
	</div>
</template>

<script>
import Cookies from "js-cookie";
export default {
	name: "header",
	data() {
		return {};
	},
	created() {
		this.login();
	},
	mounted() {},
	methods: {
		login() {
			this.$post("/api/user/login", {
				data:
					"qSQKUkHuX74gYHzg+B5ZRaSp8pygDpqtBkGdegZZ3auMr+gF56oe1qMlLFSPqKEL2YVI5yPYD9UUYpM+aDV/CRmh1+Hffx8WxWcmir2Ffh0V0xr5VIi81BscN1jVVGrIhM77ykc+gcWdpHiT1syJ9A=="
			})
				.then(res => {
					if (res.code == 0) {
						const { token } = res.data;
						Cookies.set("jtoken", token);
						setTimeout(() => {
							this.$router.push({ path: "/list" });
						}, 2000);
					} else {
						this.$toast(res.msg);
					}
				})
				.catch(err => {});
		}
	}
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
.loading {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
</style>
