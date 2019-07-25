<template>
	<div class="container">
		   	<Header></Header>
		<div class="content">
			<p>参赛规则:</p>
			<div class="i_content" v-html="data.ruledesc"></div>
			<p>注意事项:</p>
			<div class="i_content" v-html="data.desc"></div>
		</div>
			<loading v-show="!rule"></loading>
	</div>
</template>

<script>
import loading from '../Tab/loading'
import Header from '../Tab/header'
export default {
	name: "rule",
	data() {
		return {
			isloading:true,
			data: {},
			voteId: this.$route.params.voteId,
			rule:
				"<p>1.参赛者上传信息,严禁盗用他人照片等信息。</p><p>2.禁止参赛作品出现任何非法内容、言论不当等行为。</p><p>3.严禁任何作弊行为,系统发现会自动对票数清空。</p><p>4.作品设计著作权,肖像权等法律责任由活动参与者自行承担法律责任。</p><p>5.以上行为一经发现,主办方有权删除照片并取消参赛资格。</p><p>6.禁止加入诱导关注/诱导分享内容。</p>"
		};
	},
	created() {
		this.getDetail();
	},
	components: {
		loading,
		Header
	},
	mounted() {},
	methods: {
		getDetail() {
			this.$post("/api/vote/info", { voteId: this.voteId })
				.then(res => {
					console.log(res);
					if (res.code == 0) {
						this.data = res.data;
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
.container {
	background-color: #f9f9f9;
}
/* 头部 */
header {
	padding: 10px 20px;
	line-height: 30px;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
}
header i.icon {
	font-size: 20px;
}
.container header .share {
	font-size: 24px;
}

.content {
	background-color: #fff;
	width: 100%;
	padding: 20px;
	font-size: 14px;
}
.content p {
	font-size: 18px;
	padding: 10px 0;
}
.content .i_content {
	line-height: 30px;
	text-indent: 2em;
}
</style>
