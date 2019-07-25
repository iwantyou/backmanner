<template>
	<div class="container">
		<Header></Header>
		<nav>
			<img :src="data.cover" />
			<div class="bottom">
				<p class="b_left" v-if="data.self_registration">
					<i class="icon iconfont icon-shimingrenzheng"></i>
					<router-link :to="'/participate/'+voteId">
						<i>我要参与</i>
					</router-link>
				</p>
				<p class="b_right">
					<i class="icon iconfont icon_index-paihang icon-icon_index-paihang"></i>
					<router-link :to="'/panking/'+voteId">
						<i>票数排行</i>
					</router-link>
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
					<p>{{data.organizer}}</p>
				</div>
			</div>
			<div class="item">
				<div class="title">
					<span></span>
					<span>活动规则</span>
				</div>
				<div class="i_content" v-html="data.desc"></div>
			</div>
		</div>
		<loading v-show="isloading"></loading>
	</div>
</template>

<script>
import loading from '../Tab/loading'
import Header from '../Tab/header'
export default {
	name: "active_detail",
	data() {
		return {
			data: {},
			voteId: this.$route.params.voteId,
			isloading:true,
		};
	},
	components: {
		loading,
		Header
	},
	created() {
		this.getDetail();
	},
	mounted() {},
	methods: {
		getDetail() {
			this.$post("/api/vote/info", { voteId: this.voteId })
				.then(res => {
					console.log(res);

					if (res.code == 0) {
						this.data = res.data;
						this.isloading=false;
						$(".i_content").css({margin: "0 0.5rem  0 1.5rem","line-height": "2rem",color: "#868686","font-size": "1.4rem"});
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/list_detail.css";
</style>
