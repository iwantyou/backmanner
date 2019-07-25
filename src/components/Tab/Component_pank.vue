<template>
	<div class="content">
		<h4>
			排行榜
			<span></span>
		</h4>
		<div class="i_content">
			<div class="item" v-for="(item,i) in itemlist" :key="i">
				<router-link :to="'/partner_detail/'+item._id">
					<i
						:class="[{'icon iconfont icon-wangguan- wangguan':i==0},
                    {'icon iconfont icon-wangguan- wangguan wangguan1':i==1},
                    {'icon iconfont icon-wangguan- wangguan wangguan2':i==2}]"
					></i>
					<i :class="i>2?'num1':'num'">{{i+1}}</i>
					<div class="i_top">
						<img :src="item.cover" alt />
					</div>
				</router-link>
				<div class="i_bottom">
					<p>{{item.title}}</p>
					<p>
						<i>{{item.votecount}}</i>票
					</p>
					<button @click="zan(i)" v-if="item.votable">
						<i class="icon iconfont icon-zan01 xin"></i>给TA点赞
					</button>
					<button v-if="!item.votable" class="yizan" @click="zan(i)">您已点赞</button>
				</div>
			</div>
             <loading v-show='isloading'></loading>
		</div>
		<loading v-show="isloading"></loading>
	</div>
</template>

<script>
import loading from "./loading";
export default {
	name: "Cpank",
	data() {
		return {
			voteId: this.$route.params.voteId,
			itemlist: [],
			router: this.$route.name,
			isloading: true
		};
	},
	created() {
		this.getitemlist();
	},
	components: {
		loading
	},
	mounted() {},
	methods: {
		getitemlist() {
			if (this.router == "panking" || this.router == "cheer_panking") {
				this.isloading = true;
				this.$post("/api/item/listbyvotecount", {
					voteId: this.voteId
				})
					.then(res => {
						console.log(res);
						if (res.code == 0) {
							this.itemlist = res.data.data;
						} else {
							this.$toast(res.msg);
						}
						this.isloading = false;
					})
					.catch(err => {
						console.log(err);
					});
			} else if (this.router == "history_comment") {
				this.isloading = true;
				this.$post("/api/item/voted", {})
					.then(res => {
						console.log(res);
						if (res.code == 0) {
							this.itemlist = res.data;
						} else {
							this.$toast(res.msg);
						}
						this.isloading = false;
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		zan(i) {
			if (!this.itemlist[i].votable) return;
			this.$post("/api/record/add", {
				voteId: this.itemlist[i].voteId,
				itemId: this.itemlist[i]._id
			})
				.then(res => {
					if (res.code == 0) {
						console.log(res);
						this.getitemlist();
						// 使用时时间需要修改
					}
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
/* 投票排行榜 */
.content {
	position: relative;
	margin: -2rem 1rem 2rem;
	border-radius: 15px;
	background-color: #f2f2f2;
}
.content h4 {
	font-size: 2rem;
	text-align: center;
	padding-top: 1.5rem;
	padding-bottom: 1.5rem;
	position: relative;
	background-color: #fff;
	border-radius: 1.5rem 1.5rem 0 0;
}
.content h4 span {
	display: block;
	margin: auto;
	width: 5rem;
	height: 2px;
	background: linear-gradient(left, #fdd03a, #fd6f1c);
	background: -webkit-linear-gradient(left, #fdd03a, #fd6f1c);
}
.i_content {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-top: 0.5rem;
}
.i_content .item {
	position: relative;
	width: 48%;
	background-color: #fefefe;
	margin-bottom: 1rem;
	border-radius: 3px;
	height: 19rem;
}
.i_content .item .i_top {
	padding: 0.5rem;
}
.i_top img {
	width: 100%;
	height: 10rem;
}
.i_bottom {
	padding: 0.5rem;
	width: 80%;
	position: absolute;
	border-radius: 10px;
	left: 50%;
	top: 9rem;
	transform: translateX(-50%);
	background-color: #fff;
	text-align: center;
	font-size: 1.4rem;
}
.i_bottom p {
	margin-bottom: 0.5rem;
}
.i_bottom p:nth-child(1) {
	height: 3.5rem;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.i_bottom p i {
	color: #fd7135;
	margin-right: 0.3rem;
}
.xin {
	margin-right: 2px;
}
button {
	border-radius: 20px;
	box-shadow: none;
	border: none;
	background: linear-gradient(left, #ffd63e, #ff6e1f);
	background: -webkit-linear-gradient(left, #ffd63e, #ff6e1f);
	padding: 0.2rem 1rem;
	color: #fff;
	font-size: 1.4rem;
}
button.yizan {
	background: linear-gradient(left, #bababa, #919191);
	background: -webkit-linear-gradient(left, #bababa, #919191);
	padding: 0.2rem 1.5rem;
}
.item .wangguan {
	position: absolute;
	left: 0;
	top: -0.5rem;
	font-size: 3rem;
	color: #fcc642;
}
/* 以上是第一名的颜色 */
.num {
	position: absolute;
	left: 1rem;
	top: 0.7rem;
	color: #fff;
	transform: rotate(-45deg);
	font-size: 1.4rem;
}

.item .wangguan1 {
	color: #80b1de;
}
/* 第二名的颜色 */
.item .wangguan2 {
	color: #f7a15e;
}
/* 第三名的颜色 */
.num1 {
	position: absolute;
	left: 0.5rem;
	top: 0.5rem;
	width: 2rem;
	height: 2rem;
	display: block;
	text-align: center;
	color: #fff;
	background-color: #feac31;
	line-height: 2rem;
}
</style>
