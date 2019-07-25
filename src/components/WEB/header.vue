<template>
	<div>
		<div class="activity-form">
			<i class="iconfont icon-sousuo" style="font-size:18px "></i>
			<input type="text" placeholder="请输入搜索的项目或名字" />
		</div>
		<div style="display:inline-block;text-align:right;width:calc(100% - 470px);">
			<div v-if="!hideFunc" style="display:inline-block;cursor:pointer" @click="navto">
				<span style="padding-right:8px;">{{name}}</span>
				<i class="iconfont icon-tianjia" style="color:blue;font-size:30px;vertical-align:-4px;"></i>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "webheader",
	props: {
		title: {
			type: String
		},
		name: {
			type: String
		},
		word: {
			type: String
		},
		hideFunc: {
			type: Boolean
		}
	},
	methods: {
		navto() {
			console.log(this.$props);
			this.$router.push(`/web/${this.$props.title}`);
		}
	}
};
</script>
<style scoped>
.activity-form {
	width: 450px;
	line-height: 2rem;
	display: inline-block;
	border: 1px solid #ccc;
	box-sizing: border-box;
	border-radius: 5px;
	padding-left: 20px;
	box-shadow: 0 0 1px rgba(0, 0, 0, 0.7);
	transition: box-shadow 0.15s ease-in-out border-color 0.15s ease-in-out;
}
.activity-form:focus-within {
	box-shadow: 0 0 1px rgba(102, 175, 233, 0.6);
	border-color: #66afe9;
}
input[type="text"] {
	color: #666;
	margin-left: 8px;
	width: calc(100% - 35px);
	line-height: 2rem;
	border: none;
	background-color: #ecf0f5;
}
</style>

