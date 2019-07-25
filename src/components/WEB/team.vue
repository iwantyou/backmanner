<template>
	<div class="bigdata">
		<webheader :title="navname" :name="name" :hideFunc="!voteId"></webheader>
		<ul class="list flex-col">
			<li class="flex" v-for="item in teamdata" :key="item._id">
				<div class="left">
					<video :src="item.videos[0]" controls width="90%" height="90%" preload="none"></video>
				</div>
				<div class="right flex">
					<div class="team">
						<p>{{item.title}}</p>
						<p v-if="item.state == -1">待审核</p>
						<p>负责人：{{item.linkman}}</p>
						<p>活动宣言：{{item.slogan}}</p>
					</div>
					<div class="imgmove text-center">
						<div class="pt">
							<img
								:src="imgurl"
								:alt="imgurl"
								v-for="(imgurl, idx) in item.images"
								:key="idx"
								:class="(curindex[item._id] || 0) == idx ? 'img-z-index v-db' : ''"
								class="v-img"
							/>
							<div class="pt-btn">
								<button
									type="button"
									v-for="(imgurl, idx) in item.images"
									:key="idx"
									:class="(curindex[item._id] || 0) == idx ? 'bu-active' : ''"
									class="v-btn"
									@click="btnclcik(item._id, idx)"
								></button>
							</div>
						</div>
					</div>
					<div class="sh">
						<button v-if="item.state == -1" class="btn btn-success" @click="pass(item._id)">审核通过</button>
						<button v-if="item.state == -1" class="btn btn-danger" @click="reject(item._id)">审核不通过</button>
					</div>
				</div>
			</li>
		</ul>
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
import _ from "underscore";
export default {
	name: "team",
	components: {
		webheader
	},
	data() {
		return {
			voteId: this.$route.params.voteId,
			navname:
				"addteam" +
				(this.$route.params.voteId ? "/" + this.$route.params.voteId : ""),
			name: "添加队伍",
			curindex: {},
			teamdata: [],
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
		btnclcik(itemId, index) {
			var curindex = _.extend({}, this.curindex);
			curindex[itemId] = index;
			this.curindex = curindex;
		},
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
		pass(itemId) {
			this.$post("/api/item/pass", { itemId })
				.then(res => {
					if (res.code == 0) {
						this.getData();
					} else {
						alert(res.msg);
					}
				})
				.catch(err => {});
		},
		reject(itemId) {
			this.$post("/api/item/reject", { itemId })
				.then(res => {
					if (res.code == 0) {
						this.getData();
					} else {
						alert(res.msg);
					}
				})
				.catch(err => {});
		},
		getData() {
			this.$post("/api/item/listforweb", {
				page: this.page,
				limit: this.limit,
				voteId: this.voteId
			})
				.then(res => {
					if (res.code == 0) {
						const { count, data } = res.data;
						console.log(count, data);
						this.count = count;
						this.teamdata = data;
						this.total =
							count % 10 == 0 ? count / 10 : Math.floor(count / 10) + 1;
					}
				})
				.catch(err => {});
		}
	}
};
</script>
<style scoped>
@import "../../assets/web/css/data.css";
</style>