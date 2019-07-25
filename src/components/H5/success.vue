<template>
	<div class="container">
		   	<Header></Header>
		<nav>
			<div class="center">
				<i class="icon iconfont icon-dui- dui"></i>
				<p class="thank">感谢您的投票</p>
				<p class="rank">
					<i class="icon iconfont icon_index-paihang icon-icon_index-paihang"></i>
					<router-link :to="'/panking/'+voteId">
						<i>查看排行榜</i>
					</router-link>
				</p>
			</div>
		</nav>
		<div class="content">
			<p class="thanks">为了感谢您对招商银行广场舞大赛的投票活动的大力支持，诚邀你参加‘最佳助威人’的投票活动。神秘大奖等你拿。</p>
			<p class="b_bottom" v:if="self_registration">
				<i class="icon iconfont icon-shimingrenzheng"></i>
				<router-link :to="'/participate_best/'+bindId">
					<i>我要参与</i>
				</router-link>
			</p>
			<p class="no-thank" @click="goback()">不了，谢谢</p>
		</div>
	</div>
</template>

<script>
import Header from '../Tab/header'
export default {
	name: "success",
	data() {
		return {
			voteId: this.$route.params.voteId, //主活动ID
			bindId: this.$route.params.bindId, //最佳助威人活动ID
			self_registration: this.$route.params.self_registration//报名方式
		};
	},
	created() {
	},
	components: {
		Header
	},
	mounted() {
		this.Height();
	},
	methods: {
		Height() {
			var height = document.body.clientHeight;
			if (height <= 568) {
				$(".no-thank").css("padding-bottom", "80px");
			} else {
				$(".no-thank").css("padding-bottom", "140px");
			}
		},
		// 点击不了，回退到投票页
		goback() {
			console.log(this.$route.params.voteId);
			this.$router.push({ path: "/panking/" + this.voteId });
		}
	}
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/success.css";
</style>
