<template>
	<div class="container">
		   	<Header></Header>
		<nav>
			<img src="../../assets/img/participate/tip.png" alt />
			<div class="tip">
				<p>填写您的姓名或昵称参加‘最佳助威人’活动</p>
			</div>
		</nav>
		<div class="content">
			<form action>
				<div class="item">
					<p>昵称</p>
					<input type="text" placeholder="请输入您的姓名或昵称" name="name" @blur="getlength()" />
				</div>
				<div class="item">
					<p>*填写姓名或昵称请符合网络文明要求。</p>
				</div>
			</form>
			<button @click="submit()" class="submit">报&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</button>
		</div>

		<!-- <div class="alert" v-show="show">
      <div class="alert_content">
        <img class="close" src="../../assets/img/participate/close.png" alt @click="hidden()" />
        <h5>
          温馨提示
          <span></span>
        </h5>
        <div class="a_center">
          <i class="icon iconfont icon-dui- dui"></i>
          <p>您的报名资料已提交谢谢参与</p>
        </div>
        <button @click="hidden()" class="confirm">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</button>
      </div>
		</div>-->

		<div class="alert" v-show="show" @click="hidden()">
			<div class="pic">
				<div class="pic_center">
					<div class="nickname">我的昵称</div>
					<div class="code"></div>
				</div>
			</div>
		</div>
		<loading v-show="isloading"></loading>
	</div>
</template>

<script>
import loading from '../Tab/loading'
import Header from '../Tab/header'
export default {
	name: "participate_best",
	data() {
		return {
			show: false,
			voteId: this.$route.params.voteId,
			isloading:false
		};
	},
	components: {
		loading,
		Header
	},
	created() {},
	mounted() {},
	methods: {
		alert() {
			this.show = true;
		},
		hidden() {
			this.show = false;
		},
		getlength() {
			var length = $("input[name='name']").val().length;
			if (length > 10) {
				this.$toast("输入的队伍名称不能超过10个字，请重新输入");
			}
		},
		submit() {
			this.isloading=true;
			var name = $("input[name='name']").val();
			if (name != "") {
				// 提交成功后，显示相应海报
				this.$post("/api/item/add", {
					voteId: this.voteId,
					title: name,
					linkman: " ",
					linkphone: " ",
					images: [" "],
					videos: [" "],
					slogan: " "
				})
					.then(res => {
						console.log(res);
						if (res.code == 0) {
							this.isloading=false;
							this.$toast('报名成功，请耐心等待审核通过');
							this.alert();
						} else {
							this.$toast(res.msg + "请重新输入报名信息");
						}
						
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				this.$toast("您输入的信息不完整，请重新填写");
			}
		}
	}
};
</script>

<style scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/participate.css";
.alert {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	overflow-y: auto;
}
.pic {
	width: 90%;
	background: url("../../assets/img/pic/picbg.png") no-repeat top center;
	background-size: 100% 100%;
	margin: 30px auto;
	position: relative;
}
.pic_center .code {
	width: 85px;
	height: 85px;
	background-color: #ccc;
	border: 2px solid #fff;
}
.pic_center {
	padding-top: 75%;
	padding-bottom: 75%;
	overflow-y: auto;
}
.nickname {
	background: url("../../assets/img/pic/nicknamebg.png") no-repeat top center;
	background-size: 80% 100%;
	padding: 5px;
	text-align: center;
	font-size: 18px;
	color: #fff;
}
.code {
	margin: 5px auto 0;
}
</style>
