<template>
	<div class="firstpage">
		<div class="flex-1">
			<p class="big lh pl15">活跃人数</p>
			<div class="flex text-center lh">
				<div v-for="(item, index) in activecontent " :key="index" class="flex-33" style="line-height:1">
					<div class="active-blue">{{item.count}}</div>
					<div class="small">{{item.sort}}</div>
				</div>
			</div>
		</div>
		<div class="flex-2">
			<p class="big lh pl15">最新投票活动</p>
			<div class="flex flex-between" style="padding:0 15px;">
				<div class="flex-25" v-for="(item, index) in line" :key="index">
					<div class="box box-widget widget-user">
						<div class="widget-user-header bg-aqua-active">
							<h3 class="widget-user-username">{{item.title}}</h3>
							<h5 class="widget-user-desc">{{item.state}}</h5>
						</div>
						<div class="box-footer">
							<div class="flex">
								<div class="flex-33 border-right">
									<div class="description-block">
										<h5 class="description-header">{{item.likemount}}</h5>
										<span class="description-text">点赞数</span>
									</div>
									<!-- /.description-block -->
								</div>
								<!-- /.col -->
								<div class="flex-33 border-right">
									<div class="description-block">
										<h5 class="description-header">{{item.hot}}</h5>
										<span class="description-text">热度</span>
									</div>
									<!-- /.description-block -->
								</div>
								<!-- /.col -->
								<div class="flex-33">
									<div class="description-block">
										<h5 class="description-header">{{item.visitor}}</h5>
										<span class="description-text">访问量</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex-3">
			<p class="big lh pl15">今日大数据详情</p>
			<div class="flex flex-around">
				<div v-for="(item, index) in bigdata" :key="index" class="text-center">
					<p class="c-66">{{item.title}}</p>
					<p class="b-b">{{item.mount}}</p>
				</div>
			</div>
		</div>
		<div class="flex-4" id="linechart"></div>
	</div>
</template>
<script>
export default {
	name: "webfirstpage",
	data() {
		return {
			activecontent: [
				{
					count: 4568,
					sort: "日活跃数"
				},
				{
					count: 45680,
					sort: "月活跃数"
				},
				{
					count: 456800,
					sort: "年活跃数"
				}
			], //活跃数据
			line: [
				{
					title: "活动名称",
					state: "简单描述",
					likemount: 1000,
					hot: 32423,
					visitor: 234
				}, //bgimg:'',背景图片
				{
					title: "活动名称",
					state: "简单描述",
					likemount: 1000,
					hot: 32423,
					visitor: 234
				},
				{
					title: "活动名称",
					state: "简单描述",
					likemount: 1000,
					hot: 32423,
					visitor: 234
				},
				{
					title: "活动名称",
					state: "简单描述",
					likemount: 1000,
					hot: 32423,
					visitor: 234
				}
			], //最新活动
			bigdata: [
				{ title: "新用户", mount: 555 },
				{ title: "今日玩家", mount: 13244 },
				{ title: "今日帖子", mount: 34334 },
				{ title: "今日点赞", mount: 44 },
				{ title: "今日评论", mount: 444 },
				{ title: "今日建议", mount: 600 }
			]
		};
	},
	mounted() {
		this.lineChart();
	},
	methods: {
		lineChart() {
			let charts = this.$echarts.init(document.querySelector("#linechart"));
			charts.setOption({
				title: { text: "一周数据详情" },
				tooltip: {
					trigger: "axis"
				},
				legend: {
					data: [
						"新用户",
						"今日玩家",
						"今日帖子",
						"今日点赞",
						"今日评论",
						"今日建议"
					]
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
				},
				yAxis: {
					type: "value"
				},
				series: [
					{
						name: "新用户",
						type: "line",
						smooth: true,
						stack: "总量",
						data: [120, 132, 555, 134, 90, 230, 210]
					},
					{
						name: "今日玩家",
						smooth: true,
						type: "line",
						stack: "总量",
						data: [220, 182, 13244, 234, 290, 330, 310]
					},
					{
						name: "今日帖子",
						smooth: true,
						type: "line",
						stack: "总量",
						data: [150, 232, 34334, 154, 190, 330, 410]
					},
					{
						name: "今日点赞",
						smooth: true,
						type: "line",
						stack: "总量",
						data: [320, 332, 44, 334, 390, 330, 320]
					},
					{
						name: "今日评论",
						smooth: true,
						type: "line",
						stack: "总量",
						data: [820, 932, 444, 934, 1290, 1330, 1320]
					},
					{
						name: "今日建议",
						smooth: true,
						type: "line",
						stack: "总量",
						data: [44, 545, 600, 934, 1370, 1330, 1320]
					}
				]
			});
			window.addEventListener("resize", function() {
				charts.resize();
			});
		}
	}
};
</script>

<style scoped>
@import "../../assets/web/css/AdminLTE.min.css";
@import "../../assets/web/css/firstpage.css";
#linechart {
	height: 350px;
	width: 100%;
	padding: 20px 0 10px 10px;
	margin-bottom: 20px;
}
</style>

