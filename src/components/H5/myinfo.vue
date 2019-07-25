<template>
	<div class="container">
		<Header></Header>
		<nav>
			<div class="center">
				<div class="img">
					<img :src="info.avatar" alt />
				</div>
				<p class="name">{{info.name}}</p>
				<p class="phone">{{info.phone}}</p>
			</div>
		</nav>
		<div class="content">
			<div class="item">
				<div class="left">
					<img src="../../assets/img/myinfo/mysign.png" alt />
					<i>我的报名</i>
				</div>
				<router-link to="/mysign">
					<div class="right">
						<i>详细信息</i>
						<i class="icon iconfont icon-htbArrowright"></i>
					</div>
				</router-link>
			</div>
			<div class="item">
				<div class="left">
					<img src="../../assets/img/myinfo/myzan.png" alt />
					<i>我的点赞</i>
				</div>
				<router-link to="/history_comment">
					<div class="right">
						<i>详细信息</i>
						<i class="icon iconfont icon-htbArrowright"></i>
					</div>
				</router-link>
			</div>
			<!-- <div class="item">
				<div class="left">
					<img src="../../assets/img/upload(2).png" alt />
					<i>我的上传历史</i>
				</div>
				<router-link to="/history_upload">
					<div class="right">
						<i>详细信息</i>
						<i class="icon iconfont icon-htbArrowright"></i>
					</div>
				</router-link>
			</div> -->
		</div>
		<loading v-show="isloading"></loading>
	</div>
</template>

<script>
import Header from "../Tab/header";
import loading from "../Tab/loading";
export default {
	name: "myinfo",
	data() {
		return {
			isloading: true,
			info: {},
		};
	},
	components: {
		loading,
		Header
	},
	created() {
		this.getuserinfo();
	},
	mounted() {},
	methods: {
		getuserinfo() {
			this.isloading = true;
			this.$post("/api/user/info", {})
				.then(res => {
					if (res.code == 0) {
						this.info = res.data;
					} else {
						this.$toast(res.msg);
					}
					this.isloading = false;
				})
				.catch(err => {});
		}
	}
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/myinfo.css";
</style>
