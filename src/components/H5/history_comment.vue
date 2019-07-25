<template>
	<div class="container">
		<Header></Header>
		<!-- 轮播图 -->
		<nav>
			<Swiper></Swiper>
		</nav>
		<Cpank></Cpank>
	</div>
</template>

<script>
import Header from "../Tab/header";
import Cpank from "../Tab/Component_pank";
import Swiper from "../Tab/swiper";
export default {
	name: "history_comment",
	data() {
		return {
			// banner图列表
			bannerlist: [1, 2, 3]
		};
	},
	created() {},
	components: {
		Cpank,
		Header,
		Swiper
	},
	mounted() {},
	methods: {}
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/panking.css";
</style>
