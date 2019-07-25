<template>
	<div class="container">
		   	<Header></Header>
		<!-- 轮播图 -->
		<nav>
			<Swiper></Swiper>
			<router-link :to="'/rule/'+voteId">
				<div class="rule">活动规则</div>
			</router-link>
		</nav>
		<Cpank></Cpank>
	</div>
</template>

<script>

import Cpank from '../Tab/Component_pank'
import Header from '../Tab/header'
import Swiper from '../Tab/swiper'
export default {
	name: "panking",
	data() {
		return {
			voteId: this.$route.params.voteId,
		};
	},
	components: {
		Cpank,
		Header,
		Swiper
	},
	created() {	
	},
	updated() {},
	mounted() {},
	methods: {
		
	}
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/panking.css";
</style>
