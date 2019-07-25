<template>
	<div class="footer">
            <div class="f_left"><router-link to="/list">首页</router-link></div>
			<div class="f_right"><router-link to="/myinfo">我的</router-link></div>
	</div>
</template>

<script>
export default {
	name: "Footer",
	data() {
		return {

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
.footer{
    font-size: 1.6rem;
	width: 100%;
	display: flex;
	justify-content: space-between;
	background-color: #efefef;
}
.footer .f_left,.footer .f_right{
	background-color: #fff;
	text-align: center;
	width: 50%;
	height: 3rem;
	line-height: 3rem;
}
.f_left{
	border-right:1px solid #efefef;
}
</style>
