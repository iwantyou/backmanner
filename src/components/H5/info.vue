<template>
	<div class="container">
		<Header></Header>
		<nav>
			<img src="../../assets/img/participate/tip.png" alt />
			<div class="tip">
				<p>以下是您填写的信息，可在此处进行查看</p>
			</div>
		</nav>
		<div class="content">
			<form action>
				<div class="item">
					<p>队伍名称</p>
					<input type="text" placeholder="请输入队伍名称" name="name" v-model="form.name"  disabled/>
				</div>
				<div class="item">
					<p>负责人</p>
					<input type="text" placeholder="请输入负责人姓名" name="personal" v-model="form.personal" disabled/>
				</div>
				<div class="item">
					<p>联系电话</p>
					<input type="phone" placeholder="请输入负责人联系电话" name="phone" v-model="form.phone" disabled/>
				</div>
				<div class="item">
					<p>参赛图片</p>
					<label class="ui_button ui_button_primary" for="x" id="imgadd">
						<div class="pic" v-for="(item,i) in form.images" :key="i">
							<img @click="show=true" :src="item" class="img-avatar" />
						</div>
					</label>
				</div>
				<div class="item">
					<p>上传参赛视频</p>
					<video
						id="video"
						preload="none"
						:src="form.video[0]"
						controls
						reload
						type="video/mp4"
						poster="../../assets/img/banner.png"
					></video>
				</div>
				<div class="item">
					<p>活动宣言</p>
					<textarea name="sign" id cols="50" rows="6" placeholder="100-300字" v-model="form.sign" disabled></textarea>
				</div>
			</form>
		</div>
		<van-image-preview v-model="show" :images="form.images" @change="onChange">
			<template v-slot:index>第{{ index }}页</template>
		</van-image-preview>
			<!-- 加载动画 -->
		<loading v-show="!form"></loading>
	</div>
</template>

<script>
import loading from '../Tab/loading'
import Header from '../Tab/header'
export default {
	name: "info",
	data() {
		return {
			isloading:true,
			show: false,
			index:0,
			form: {
				name: "张三",
				personal: "夕阳红歌舞团",
				phone: "1546231231",
				sign: "我们是最厉害的",
				images: ["/static/img/xuan.307f9e1.png"],
				video: [
					"https://cdn.xidong360.com/gcw2018/videos/08853f44349948fca24a961cc6beaeb0.mp4"
				]
			}
		};
	},
	components: {
		loading,
		Header
	},
	created() {},
	mounted() {},
	methods: {
		onChange(index) {
			this.index = index;
		}
	}
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/participate.css";
</style>
