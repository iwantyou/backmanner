<template>
	<div class="container">
		<Header></Header>
		<div class="content" v-show="itemlist.length!=='0'">
			<div class="item" v-for="(item,i) in itemlist" :key="i">
				<router-link :to="'/active_detail/'+item.voteId">
					<img :src="item.cover" alt />
				</router-link>
				<div class="bottom">
					<div class="b_left">
						<p>{{item.title}}</p>
						<p class="time">
							<i class="icon iconfont icon-iconfront-"></i>
							{{item.start|dataFormat}}-{{item.end|dataFormat}}
						</p>
					</div>
					<div class="b_right" v-if="item.state==0" style="flex-direction: column;">
						<router-link :to="'/panking/'+item.voteId" class="b_right">
							<p>查看排行榜</p>
						</router-link>
						<router-link :to="'/info/'+item._id" class="b_right">
							<p>查看报名信息</p>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="content" v-show="itemlist.length==0">
			您暂无参加的活动
		</div>
		<loading v-show="isloading"></loading>
	</div>
</template>

<script>
import loading from "../Tab/loading";
import Header from "../Tab/header";
export default {
	name: "mysign",
	data() {
		return {
			isloading: true,
			data: {},
			itemlist: []
		};
	},
	components: {
		loading,
		Header
	},
	created() {
		this.getlist();
	},
	mounted() {},
	methods: {
		getlist() {
			this.isloading = true;
			this.$post("/api/item/my", {})
				.then(res => {
					if (res.code == 0) {
						console.log(res);
						this.itemlist = res.data;
					}
					this.isloading = false;
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

header {
	background-color: #f9f9f9;
}
/* 投票列表 */
.content {
	background-color: #efefef;
	width: 100%;
	padding: 0.8rem;
}
.content .item {
	background-color: #fff;
	padding: 0.9rem;
	border-radius: 6px;
	margin: 0 auto 1rem;
	position: relative;
}
.content .item img {
	width: 100%;
}
.content .item .bottom {
	background-color: #fff;
	margin: auto;
	padding: 0.5rem 0 0;
	display: flex;
	justify-content: space-between;
	color: #868686;
	border-radius: 4px;
}
.bottom .b_left {
	font-size: 1.6rem;
}
.bottom .b_left .time {
	font-size: 1.2rem;
	margin-top: 0.4rem;
	color: #9c9c9c;
}
.bottom .b_right {
	font-size: 1.5rem;
	color: #fc5d07;
	display: flex;
	align-items: flex-end;
}
.bottom .b_right p {
	margin-bottom: 0.5rem;
}
</style>
