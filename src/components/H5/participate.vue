<template>
	<div class="container">
		<Header></Header>
		<nav>
			<img src="../../assets/img/participate/tip.png" alt />
			<div class="tip">
				<p>请仔细填写下列信息与投票。</p>
				<p>请保证填写信息的真实性。</p>
			</div>
		</nav>
		<div class="content">
			<form action>
				<div class="item">
					<p>队伍名称</p>
					<input type="text" placeholder="请输入队伍名称" name="name" @blur="getlength()" />
				</div>
				<div class="item">
					<p>负责人</p>
					<input type="text" placeholder="请输入负责人姓名" name="personal" />
				</div>
				<div class="item">
					<p>联系电话</p>
					<input type="phone" placeholder="请输入负责人联系电话" name="phone" />
				</div>
				<div class="item">
					<p>上传精彩图片</p>
					<label class="ui_button ui_button_primary" for="x" id="imgadd">
						<div
							class="pic"
							v-show="images.length!=0&&images.length<=9"
							v-for="(item,i) in images"
							:key="i"
						>
							<img src="../../assets/img/participate/close.png" alt class="del" @click.prevent="del(i)" />
							<img :src="images[i]" class="img-avatar" @click.prevent="pre=true" />
						</div>
						<div id="pic" v-show="images.length<=8">
							<p></p>
							<p></p>
						</div>
					</label>
					<input
						type="file"
						ref="file"
						id="x"
						@change="uploadImg()"
						name="avatar"
						class="take-picture"
						accept="image/jpeg, image/png"
						multiple
						v-if="images.length<9"
					/>
				</div>
				<div class="item">
					<p>上传参赛视频</p>
					<label class="ui_button ui_button_primary" for="y">
						<div id="videoImg" v-show="videos.length==0">
							<div class="top">
								<p></p>
								<p></p>
							</div>
							<div class="bottom">
								<p>点击或将文件拖拽到这里上传</p>
								<p>支持的拓展名MP4......</p>
							</div>
						</div>
					</label>
					<input
						type="file"
						id="y"
						name="take-video"
						class="take-video"
						accept="video/mp4"
						@change="uploadVideo()"
					/>
					<video
						v-for="(item,i) in videos"
						:key="i"
						v-show="videos.length!==0"
						id="video"
						:src="item"
						preload="none"
						controls
						reload
						type="video/mp4"
						poster="../../assets/img/banner.png"
					></video>
				</div>
				<div class="item">
					<p>活动宣言</p>
					<textarea name="sign" id cols="50" rows="6" placeholder="100-300字"></textarea>
				</div>
			</form>
			<button @click="submit()" class="submit">报&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</button>
		</div>

		<div class="alert" v-show="show">
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
				<button @click="toast()" class="confirm">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</button>
			</div>
		</div>
		<!-- 图片预览 -->
		<van-image-preview v-model="pre" :images="images" @change="onChange()">
			<template v-slot:index>第{{ index }}页</template>
		</van-image-preview>
		<loading v-show="isloading"></loading>
	</div>
</template>

<script>
import loading from "../Tab/loading";
import Header from "../Tab/header";
export default {
	name: "participate",
	data() {
		return {
			show: false,
			images: [],
			videos: [],
			voteId: this.$route.params.voteId,
			pre: false,
			index: 0,
			isloading: false
		};
	},
	components: {
		loading,
		Header
	},
	created() {},
	mounted() {},
	methods: {
		// 报名成功后提示报名成功
		alert() {
			this.show = true;
		},
		//关闭报名成功提示
		hidden() {
			this.show = false;
		},
		// 上传视频
		uploadVideo() {
			let file = event.target.files[0];
			if (file.size > 100 * 1024 * 1024) {
				return this.$toast("视频不能超过100M，请压缩后再上传");
			}
			if (file.type != "video/mp4") {
				return this.$toast("视频仅支持mp4格式，请转码后再上传");
			}
			let formData = new FormData();
			formData.append("file", file);
			this.isloading = true;
			this.$upload(formData)
				.then(res => {
					if (res.code == 0) {
						this.videos.push(res.data);
					} else {
						this.$toast(res.msg + ",请重新选择视频并上传");
					}
					this.isloading = false;
				})
				.catch(err => {
					console.log(err);
				});
		},
		// 上传图片
		uploadImg() {
			// 获取上传的图片
			let files = this.$refs.file.files;
			for (let i = 0; i < files.length; i++) {
				let file = files[i];
				if (file.size > 2 * 1024 * 1024) {
					return this.$toast("单张图片不能超过2M，请压缩后再上传");
				}
				if (file.type != "image/jpeg" && file.type != "image/png") {
					return this.$toast("图片仅支持jpg/png格式，请转码后再上传");
				}
			}
			this.isloading = true;
			this.$async.eachSeries(
				files,
				(file, callback) => {
					if (this.images.length < 9) {
						let formData = new FormData();
						formData.append("file", file);
						this.$upload(formData)
							.then(res => {
								if (res.code == 0) {
									this.images.push(res.data);
								}
								callback(null);
							})
							.catch(err => {
								callback(null);
							});
					} else {
						callback(null);
					}
				},
				err => {
					this.isloading = false;
				}
			);
		},
		// 点击叉号删除
		del(i) {
			this.images.splice(i, 1);
		},
		getlength() {
			var length = $("input[name='name']").val().length;
			if (length > 10) {
				this.$toast("输入的队伍名称不能超过10个字，请重新输入");
			}
		},
		// 提交的表单信息
		submit() {
			var name = $("input[name='name']").val();
			var personal = $("input[name='personal']").val();
			var phone = $("input[name='phone']").val();
			var sign = $("textarea[name='sign']").val();
			if (
				name != "" &&
				personal != "" &&
				phone != "" &&
				sign != "" &&
				this.images.length > 0 &&
				this.videos.length > 0
			) {
				this.isloading = true;
				this.$post("/api/item/add", {
					voteId: this.voteId,
					title: name,
					linkman: personal,
					linkphone: phone,
					images: this.images,
					videos: this.videos,
					slogan: sign
				})
					.then(res => {
						if (res.code == 0) {
							this.alert();
						} else {
							this.$toast(res.msg);
						}
						this.isloading = false;
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				this.$toast("您输入的信息不完整，请重新填写");
			}
		},
		toast() {
			this.hidden();
			this.$toast("您的报名信息已经提交，请耐心等候审核通过");
			setTimeout(() => {
				this.success();
			}, 1000);
		},
		success() {
			this.$router.push({ path: "/active_detail/" + this.voteId });
		},
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
