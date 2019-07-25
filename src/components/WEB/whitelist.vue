<!---白名单管理-->
<template>
	<div class="white">
		<webheader :title="navname" :name="name"></webheader>
		<div class="white-content">
			<div class="b-r">
				<table class="table table-hover" style="border-bottom:2px solid #ccc">
					<tr class="table-hea">
						<th>#</th>
						<th>姓名</th>
						<th>手机号</th>
						<th>身份证号</th>
						<th>生日</th>
						<th>级别</th>
						<th style="text-align:right;padding-right:34px;">操作</th>
					</tr>
					<template v-if="whitedata.length>0">
						<tbody v-for="(item, index) in whitedata" :key="index">
							<tr>
								<td>{{index+1}}</td>
								<td>{{item.name}}</td>
								<td>{{item.mobile}}</td>
								<td>{{item.idno}}</td>
								<td>{{item.birth}}</td>
								<td>{{item.level == 'W5' ? '资产5W以上' : (item.level == 'W10' ? '资产10W以上' : '-')}}</td>
								<td style="text-align:right;cursor:pointe">
									<button class="btn btn-danger" @click="removeWhite(item._id)">删除</button>
								</td>
							</tr>
						</tbody>
					</template>
					<tbody v-else>
						<tr>
							<td colspan="7">暂无数据</td>
						</tr>
					</tbody>
				</table>
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
	name: "whitelist",
	components: {
		webheader
	},
	data() {
		return {
			voteId: this.$route.params.voteId,
			navname: "addwhitelist",
			name: "添加白名单",
			whitedata: [],
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
			this.$post("/api/whitelist/list", {
				voteId: this.voteId,
				page: this.page,
				limit: this.limit
			})
				.then(res => {
					if (res.code == 0) {
						const { count, data } = res.data;
						console.log(count, data);
						this.count = count;
						this.whitedata = data;
						this.total =
							count % 10 == 0 ? count / 10 : Math.floor(count / 10) + 1;
					}
				})
				.catch(err => {});
		},
		removeWhite(_id) {}
	}
};
</script>
<style>
@import "../../assets/web/css/whitelist.css";
</style>