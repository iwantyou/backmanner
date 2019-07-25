<template>
	<div class="container">
		   	<Header></Header>
		<nav>
			<video :src="info.videos[0]" controls="controls" preload="none"></video>
		</nav>
		<div class="content">
			<h5>{{info.title}}</h5>
			<div class="zan">
				<div class="circle">
					<img v-if="info.votable" src="../../assets/img/partner_detail/yzan@3x.png" alt @click="Show()" />
					<img v-else src="../../assets/img/partner_detail/zan@3x.png" alt />
				</div>
				<p>
					已获得
					<i>{{info.votecount}}</i> 票
					<span></span>
				</p>
			</div>

			<div class="item">
				<p v-if="info.slogan">{{info.slogan}}</p>
				<p v-else>当前队伍暂无宣言</p>
				<img v-for="(item,i) in info.images" :key="i" :src="item" alt @click="pre=true" />
			</div>
			<button @click="alert()">
				<i class="icon iconfont icon-xaingji"></i>生成海报照片
			</button>
		</div>

		<!-- 点击生成海报 -->
		<div class="alert" v-show="flag" @click="close()">
			<div class="a_content">
				<div :class="info.slogan.length==0?'a_center1':'a_center'">
					<img :src="info.cover" alt />
					<div class="a_bottom">
						<div class="ab_top">
							<div class="ab_img"></div>
							<p>{{info.title}}</p>
						</div>
						<div class="b_bottom" v-if="info.slogan">{{info.slogan}}</div>
						<div class="b_bottom" v-else>当前队伍暂无宣言</div>
					</div>
				</div>
				<div class="ab_bottom">
					<i>活动时间</i>
					<span>{{info.createdAt|dataFormat}}</span>
				</div>
			</div>
		</div>
		<van-image-preview v-model="pre" :images="info.images" @change="onChange">
			<template v-slot:index>第{{ index }}页</template>
		</van-image-preview>
			<loading v-show='isloading'></loading>
	</div>
</template>

<script>
import loading from '../Tab/loading'
import Header from '../Tab/header'
import icon from "@/assets/font/iconfont.js";
export default {
	name: "partner_detail",
	data() {
		return {
			// 海报
			flag: false,
			itemId: this.$route.params.itemId,
			info: {},
			pre: false,
			index: 0,
			isloading:true,
		};
	},
	components: {
		loading,
		Header
	},
	created() {
		console.log(this.it);
		
		this.getinfo();
	},
	mounted() {},
	methods: {
		onChange(index) {
			this.index = index;
		},
		// 生成海报
		alert() {
			this.flag = true;
		},
		// 点赞与未点赞图标的切换
		Show() {
			this.$post("/api/record/add", {
				voteId: this.info.voteId,
				itemId: this.itemId
			})
				.then(res => {
					console.log(res);
					this.info.state = 1;
					if (res.code == 0) {
							this.getinfo();
						setTimeout(() => {
							this.success();
						}, 1200);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		close() {
			this.flag = false;
		},
		getinfo() {
			this.$post("/api/item/info", { itemId: this.itemId })
				.then(res => {
					if (res.code == 0) {
						console.log(res);
						this.info = res.data;
						this.isloading=false;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		success() {
			this.$router.push({
				path:
					"/success/" +
					this.info.voteId +
					"/" +
					this.info.bindId +1+
					"/" +
					(this.info.self_registration ? 1 : 0)
			});
			// bindId暂时写成1
		}
	}
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/partner_detail.css";
</style>
