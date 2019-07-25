<template>
	<div class="container">
		<Header></Header>
		<nav>
			<img src="../../assets/img/participate/tip.png" alt />
			<div class="tip">
				<p>以下为您每次上传的图片以及视频</p>
			</div>
		</nav>
		<div class="content">
			<div class="item">
				<div class="title">活动名称：{{info.voteTitle}}</div>
				<div class="title">队伍名称：{{info.title}}</div>
				<div class="title">上传时间：{{date|dataFormat}}</div>
				<div class="pic">
					<p>上传的图片</p>
					<div class="img">
						<img v-for="(item,i) in info.images" :key="i" @click="show=true" :src="item" alt />
					</div>
				</div>
				<div class="video">
					<p>上传的视频</p>
					<video :src="info.video" controls preload="none"></video>
				</div>
				<div class="slogan">
					<p>上传的宣言</p>
					<p class="text">{{info.slogan}}</p>
				</div>
			</div>
		</div>
		<van-image-preview v-model="show" :images="info.images" @change="onChange">
			<template v-slot:index>第{{ index }}页</template>
		</van-image-preview>

		<!-- 加载动画 -->
		<loading v-show="!info"></loading>
	</div>
</template>

<script>
import Header from '../Tab//header'
import loading from '../Tab/loading'
export default {
	name: "history_upload",
	data() {
		return {
			isloading:true,
			show: false,
			index: 0,
			images: ["https://img.yzcdn.cn/2.jpg", "https://img.yzcdn.cn/2.jpg"],
			info: {
				voteTitle: "最佳助威人",
				title: "夕阳红舞蹈队",
				uploadTime: "2019.07.14",
				images: ["/static/img/xuan.307f9e1.png"],
				video: [
					"https://cdn.xidong360.com/gcw2018/videos/08853f44349948fca24a961cc6beaeb0.mp4"
				],
				slogan:
					"温县秋之韵水兵舞团成立于2015年12月。水兵舞幽默欢快、灵活多变，舞姿舒展大方、活泼奔放，深受大家喜爱。目前团队已过百人，为普及和推广水兵舞，秋之韵水兵舞蹈队将一如既往，以温县广场为主场，着力普及和推广水兵舞，带领广大水兵舞爱好者舞出快乐，舞出健康!"
			}
		};
	},
	components: {
		loading,
		Header
	},
	created() {
		this.date = new Date();
		console.log(this.date);
	},
	mounted() {},
	methods: {
		
		onChange(index) {
			this.index = index;
		}
		// 调取上传历史接口改变isloading状态
	}
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/history_upload.css";
</style>
