<!--总布局 -->
<template>
	<div id="app1">
		<div class="webhome hold-transition skin-blue sidebar-mini">
			<div class="wrapper">
				<header class="main-header">
					<a href="/#/web/home" class="logo">
						<span class="logo-mini">
							<b>A</b>LT
						</span>
						<span class="logo-lg">后台管理系统</span>
					</a>
					<nav class="navbar navbar-static-top">
						<!-- 头部-->
						<div class="navbar-custom-menu">
							<ul class="nav navbar-nav">
								<li class="dropdown user user-menu">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown">
										<i class="iconfont icon-xuerentou" v-if="true" style="color:pink"></i>
										<img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image" v-else />
										<span class="hidden-xs">{{admininfo.name}}</span>
									</a>
									<ul class="dropdown-menu">
										<li class="user-header">
											<i class="iconfont icon-xuerentou" v-if="true" style="color:pink"></i>
											<img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image" v-else />
											<p>
												{{admininfo.name}}
												<small v-if="admininfo.role=='0'">管理员</small>
												<small v-if="admininfo.role=='1'">超级管理员</small>
											</p>
										</li>
										<!-- 菜单主题 -->
										<!-- <li class="user-body">
											<div class="row">
												<div class="col-xs-4 text-center">
													<a href="#">说明</a>
												</div>
												<div class="col-xs-4 text-center">
													<a href="#">说明</a>
												</div>
												<div class="col-xs-4 text-center">
													<a href="#">说明</a>
												</div>
											</div>
										</li>-->
										<!-- 菜单底部-->
										<li class="user-footer">
											<!-- <div class="pull-left">
												<a href="#" class="btn btn-default btn-flat">简要</a>
											</div>-->
											<div class="pull-right">
												<a href="javascript:;" @click="logout" class="btn btn-default btn-flat">注销</a>
											</div>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</nav>
				</header>
				<!-- 侧边栏-->
				<aside class="main-sidebar">
					<section class="sidebar">
						<ul class="sidebar-menu" data-widget="tree">
							<li class="header" style="font-size:120%;color:#666">欢迎您，{{admininfo.name}}</li>
							<li
								v-for="(item, index) in leftnav"
								:key="index"
								:class="[{'active' : item.url == $route.path}]"
							>
								<router-link :to="item.url" tag="a">
									<i
										:class="[
                    {'iconfont icon-sy' : item.name == '首页'},
                    {'iconfont icon-huodongguanli': item.name == '活动管理'},
                    {'iconfont icon-shujuguanli' : item.name == '投票数据管理'},
                    {'iconfont icon-daichuli' : item.name == '敏感字处理'},
                    {'iconfont icon-weibiaoti5' : item.name == '账户管理'}
                  ]"
									></i>
									<span>{{item.name}}</span>
								</router-link>
							</li>
						</ul>
					</section>
					<!-- 结束 -->
				</aside>

				<div class="content-wrapper">
					<router-view />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Cookies from "js-cookie";
export default {
	name: "layout",
	data() {
		return {
			admininfo: {},
			popname: "喜动科技", //欢迎名称
			leftnav: [
				{ name: "首页", url: "/web/home" },
				{ name: "活动管理", url: "/web/activity" },
				{ name: "投票数据管理", url: "/web/team" },
				{ name: "敏感字处理", url: "/web/sensitiveword" },
				{ name: "账户管理", url: "/web/account", admin: true }
			], //侧边栏内容
			curindex: 0, // 侧边栏的点击索引
			name: "首页"
		};
	},
	created() {
		this.getAdminInfo();
	},
	mounted() {},
	methods: {
		getAdminInfo() {
			this.$post("/api/admin/info")
				.then(res => {
					if (res.code == 0) {
						if (!res.data.isAdmin) {
							Cookies.remove("jtoken");
							this.$router.push({ path: "/web/login" });
							return;
						}
						this.admininfo = res.data;
						if (res.data.role != "1") {
							this.leftnav = this.leftnav.filter(n => !n.admin);
							if (this.$route.path == "/web/account") {
								return this.$router.push({ path: "/web/home" });
							}
						}
					} else if (res.code == 3) {
						//token失效 重新登录
						Cookies.remove("jtoken");
						this.$router.push({ path: "/web/login" });
					}
				})
				.catch(err => {});
		},
		logout() {
			Cookies.remove("jtoken");
			this.$router.push({ path: "/web/login" });
		}
	}
};
</script>
<style scoped>
@import "../../assets/web/css/skins/_all-skins.min.css";
@import "../../assets/web/css/AdminLTE.min.css";
#app1 {
	width: 100%;
	height: 100%;
}
.webhome {
	height: 100%;
}
.pull-down {
	transform: rotate(-90deg) !important;
	transition: all 0.6s;
}
</style>
