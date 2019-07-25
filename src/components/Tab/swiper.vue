<template>
        <van-swipe :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="{item,i} in bannerlist" :key="i">
					<img src="../../assets/img/list/banner.png" />
				</van-swipe-item>
		</van-swipe>
</template>

<script>
export default {
	name: "swiper",
	data() {
		return {
			bannerlist: [1, 2, 3],
		};
	},
	created() {
	},
	mounted() {},
	methods: {
	
	
	}
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
img{
    width: 100%;
}
</style>
