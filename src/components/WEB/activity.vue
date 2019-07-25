<!---活动基本信息管理-->
<template>
	<div class="activity">
		<webheader :title="navname" :name="name"></webheader>
		<div class="list">
			<div class="list-item">
				<template v-for="item in activitydata">
					<div class="list-items" :key="item._id">
						<img class="db-block fl" :src="item.cover" />
						<div class="content-right flex">
							<div class="div le flex-col">
								<div class="title">{{item.title}}</div>
								<!-- <div class="des">{{item.desc}}</div> -->
								<div class="time">开始时间：{{item.start|dataFormat}} 结束时间：{{item.end|dataFormat}}</div>
								<div>
									<span>参赛数量：{{item.itemcount}}</span>
									<span>总投票数量：{{item.votecount}}</span>
								</div>
							</div>
							<div class="cen div" v-html="item.publish ? '已发布':'未发布'"></div>
							<div class="rig div">
								<ul>
									<li class="orange" @click="$router.push('/web/team/' + item._id)">投票队伍</li>
									<li class="gray" @click="$router.push('/web/rule/' + item._id)">规则设置</li>
									<li class="gray" @click="$router.push('/web/whitelist/' + item._id)">白名单</li>
									<li class="green" @click="$router.push('/web/addactivity/' + item._id)">编辑</li>
									<li class="red" @click="removeActivity(item._id)">删除</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="list-items" v-if="item.bindvote" :key="item.bindvote._id">
						<img class="db-block fl" :src="item.bindvote.cover" />
						<div class="content-right flex">
							<div class="div le flex-col">
								<div class="title">{{item.bindvote.title}}</div>
								<!-- <div class="des">{{item.bindvote.desc}}</div> -->
								<div
									class="time"
								>开始时间：{{item.bindvote.start|dataFormat}} 结束时间：{{item.bindvote.end|dataFormat}}</div>
								<div>
									<span>参赛数量：{{item.bindvote.itemcount}}</span>
									<span>总投票数量：{{item.bindvote.votecount}}</span>
								</div>
							</div>
							<div class="cen div" v-html="item.bindvote.publish ?'已发布' : '未发布'"></div>
							<div class="rig div">
								<ul>
									<li class="orange" @click="$router.push('/web/team/' + item.bindvote._id)">投票队伍</li>
									<li class="gray" @click="$router.push('/web/rule/' + item.bindvote._id)">规则设置</li>
									<li class="gray" @click="$router.push('/web/whitelist/' + item.bindvote._id)">白名单</li>
									<li class="green" @click="$router.push('/web/addactivity/' + item.bindvote._id)">编辑</li>
								</ul>
							</div>
						</div>
					</div>
				</template>
			</div>
		</div>
		<div class="footer-elp text-center">
			<nav aria-label="Page navigation" v-if="total > 1">
				<ul class="pagination">
					<li :class="page <= 1 ? 'disabled' : ''">
						<a href="javascript:;" aria-label="Previous" @click="prev()">
							<span aria-hidden="true">&laquo;</span>
						</a>
					</li>
					<li>
						<a href="javascript:;">{{page}}</a>
					</li>
					<li :class="page >= total ? 'disabled' : ''">
						<a href="javascript:;" aria-label="Next" @click="next()">
							<span aria-hidden="true">&raquo;</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>
<script>
import webheader from "./header";
export default {
	name: "activity",
	components: {
		webheader
	},
	data() {
		return {
			navname: "addactivity",
			name: "创建活动",
			activitydata: [],
			page: 1,
			limit: 5,
			total: 0,
			count: 0
		};
	},
	created() {
		this.getData();
	},
	methods: {
		prev() {
			if (this.page <= 1) return;
			this.page--;
			this.getData();
		},
		next() {
			if (this.page >= this.total) return;
			this.page++;
			this.getData();
		},
		getData() {
			this.$post("/api/vote/listforweb", { page: this.page, limit: this.limit })
				.then(res => {
					if (res.code == 0) {
						const { count, data } = res.data;
						this.count = count;
						this.activitydata = data;
						this.total =
							count % 10 == 0 ? count / 10 : Math.floor(count / 10) + 1;
					}
				})
				.catch(err => {});
		},
		removeActivity(voteId) {}
	}
};
</script>
<style scoped>
@import "../../assets/web/css/activity.css";
</style>
