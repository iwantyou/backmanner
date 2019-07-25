<!--创建活动 -->
<template>
	<div class="create">
		<div class="create-header">
			<img src="../../assets/web/img/wenxintishi.png" class="img" />
			<div class="tips">
				<div>温馨提示</div>
				<div class="small">请认真填写基本活动信息</div>
			</div>
		</div>
		<div class="input">
			<label for="title">
				<input type="text" id="title" v-model="voteinfo.title" placeholder="请输入活动名称" required />
			</label>
		</div>
		<div class="input">
			<label for="organizer">
				<input type="text" id="organizer" v-model="voteinfo.organizer" placeholder="请输入活动主办方" required />
			</label>
		</div>
		<div class="updownload">
			<label for="cover">
				<div class="fmm">
					<div style="text-align:center;font-size:1.5rem;color:#ccc">
						<img class="img-add" :src="voteinfo.cover" />
					</div>
					<div class="text-center">上传活动封面</div>
				</div>
			</label>
			<input
				type="file"
				id="cover"
				@change="uploadCover()"
				style="display:none;"
				accept="image/jpeg, image/png"
			/>
		</div>
		<div class="acti-time">
			<div class="date">
				<el-date-picker
					:editable="false"
					v-model="voteinfo.start"
					type="datetime"
					placeholder="选择开始日期"
					default-time="12:00:00"
					format="yyyy-MM-dd HH:mm"
				></el-date-picker>
			</div>
			<span>--</span>
			<div class="date">
				<el-date-picker
					:editable="false"
					v-model="voteinfo.end"
					type="datetime"
					placeholder="选择结束日期"
					default-time="12:00:00"
					format="yyyy-MM-dd HH:mm"
				></el-date-picker>
			</div>
		</div>
		<div class="activi-content">
			<textarea class="text-content" v-model="voteinfo.desc" placeholder="活动说明"></textarea>
		</div>
		<div class="switch">
			<el-switch
				style="display: block"
				v-model="voteinfo.publish"
				active-color="#13ce66"
				inactive-color="#ff4949"
				active-text="发布"
				inactive-text="撤下"
			></el-switch>
		</div>
		<div class="but">
			<div @click="addActivity()">提交</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "addactivity",
	data() {
		return {
			voteId: this.$route.params.voteId,
			isloading: false,
			voteinfo: {
				title: "",
				organizer: "",
				cover: "",
				start: "",
				end: "",
				desc: "",
				publish: false
			}
		};
	},
	created() {
		this.getActivity();
	},
	methods: {
		uploadCover() {
			let file = event.target.files[0];
			if (file.size > 2 * 1024 * 1024) {
				return this.$toast("单张图片不能超过2M，请压缩后再上传");
			}
			if (file.type != "image/jpeg" && file.type != "image/png") {
				return this.$toast("图片仅支持jpg/png格式，请转码后再上传");
			}
			let formData = new FormData();
			formData.append("file", file);
			this.isloading = true;
			this.$upload(formData)
				.then(res => {
					if (res.code == 0) {
						this.cover = res.data;
					} else {
						this.$toast(res.msg);
					}
					this.isloading = false;
				})
				.catch(err => {
					console.log(err);
				});
		},
		getActivity() {
			if (this.voteId) {
				this.$post("/api/vote/infoweb", { voteId: this.voteId })
					.then(res => {
						if (res.code == 0) {
							const {
								title,
								organizer,
								cover,
								start,
								end,
								desc,
								publish
							} = res.data;
							this.voteinfo = {
								title,
								organizer,
								cover,
								start: new Date(start),
								end: new Date(end),
								desc,
								publish
							};
						} else {
							this.$toast(res.msg);
						}
					})
					.catch(err => {});
			}
		},
		addActivity() {
			if (!this.voteinfo.title) return this.$toast("活动名称不能为空");
			if (!this.voteinfo.organizer) return this.$toast("活动主办方不能为空");
			if (!this.voteinfo.cover) return this.$toast("活动封面不能为空");
			if (!this.voteinfo.start) return this.$toast("开始时间不能为空");
			if (!this.voteinfo.end) return this.$toast("结束时间不能为空");
			if (!this.voteinfo.desc) return this.$toast("活动说明不能为空");
			const voteinfo = {
				title: this.voteinfo.title,
				organizer: this.voteinfo.organizer,
				cover: this.voteinfo.cover,
				start: this.voteinfo.start.getTime(),
				end: this.voteinfo.end.getTime(),
				desc: this.voteinfo.desc,
				publish: this.voteinfo.publish
			};

			this.$post("/api/vote/add", { voteId: this.voteId, voteinfo })
				.then(res => {
					if (res.code == 0) {
						this.$router.push({ path: "/web/activity" });
					} else {
						this.$toast(res.msg);
					}
				})
				.catch(err => {});
		}
	}
};
</script>
<style scoped>
@import "../../assets/web/css/creatactivity.css";
</style>


