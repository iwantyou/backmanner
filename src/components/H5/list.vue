<template>
	<div class="container">
		<Header></Header>
		<!-- 轮播图 -->
		<nav>
			<Swiper></Swiper>
			<!-- 轮播 -->
		</nav>
		<div class="content">
			<div class="item" v-for="(item,i) in itemlist" :key="i">
				<img :src="item.cover" alt />
				<div class="bottom">
					<div class="b_left">
						<p>{{item.title}}</p>
						<p class="time">
							<i class="icon iconfont icon-iconfront-"></i>
							{{item.start|dataFormat}}-{{item.end|dataFormat}}
						</p>
					</div>
					<div class="b_right">
						<router-link :to="'active_detail/'+item._id" class="b_right">
							查看活动
							<i class="icon iconfont icon-dashujukeshihuaico- more"></i>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<Footer></Footer>
		<loading v-show="isloading"></loading>
	</div>
</template>

<script>
import loading from '../Tab/loading'
import Footer from '../Tab/footer'
 import Header from '../Tab/header'
 import Swiper from '../Tab/swiper'
export default {
	name: "list",
	data() {
		return {
			// banner图列表
			bannerlist: [1, 2, 3],
			// 活动列表
			itemlist: [],
			isloading:true
		};
	},
	created() {
		this.getlist();
	},
	mounted() {},
	methods: {
		getlist() {
			this.$post("/api/vote/list", { page: 1, limit: 10 })
				.then(res => {
					if (res.code == 0) {
						console.log(res);
						this.itemlist = res.data.data;
						this.isloading=false;
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
	components: {
		Footer,
		loading,
		Header,
		Swiper
	}
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/list.css";
</style>
