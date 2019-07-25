<!---账号管理-->
<template>
	<div class="account">
		<webheader :title="navname" :name="name"></webheader>
		<div class="list">
			<div class="list-item" v-for="(item, index) in accountdata" :key="index">
				<img :src="item.avatar" class="img" />
				<div class="content-right">
					<p>账户姓名：{{item.name}}</p>
					<p class="small">手机号：{{item.mobile}}</p>
					<button v-if="item.removeable" @click="removeAccount(item._id)" class="btn btn-danger fr">删除</button>
				</div>
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
	name: "account",
	components: {
		webheader
	},
	data() {
		return {
			navname: "addaccount",
			name: "添加账户",
			accountdata: [],
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
			this.$post("/api/admin/list", { page: this.page, limit: this.limit })
				.then(res => {
					if (res.code == 0) {
						const { isAdmin, count, data } = res.data;
						if (!isAdmin) {
							return this.$router.push({ path: "/web/home" });
						}
						this.count = count;
						this.accountdata = data;
						this.total =
							count % 10 == 0 ? count / 10 : Math.floor(count / 10) + 1;
					}
				})
				.catch(err => {});
		},
		removeAccount(_id) {
			console.log(_id);
			this.$post("/api/admin/remove", { _id })
				.then(res => {
					if (res.code == 0) {
						this.getData();
					} else {
						alert(res.msg);
					}
				})
				.catch(err => {});
		}
	}
};
</script>
<style scoped>
@import "../../assets/web/css/account.css";
</style>


