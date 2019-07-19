<template>
    <div class="bigdata">
        <webheader :title="navname" :name="name"></webheader>       
            <ul class="list flex-col">
                <li  class="flex">
                    <div class="left">
                        <video src=../../assets/web/video/b9d7ba63f2201b62f642753eca90038c.mp4 controls width= 90% height = 90% ></video>
                    </div>
                    <div class="right flex">
                        <div class="team">
                            <p>{{data[0].right.team.name}}</p>
                            <p v-html="data[0].right.team.state == 1 ? '已审核通过' : '审核未通过'"></p>
                            <p>负责人：{{data[0].right.team.mobile}}</p>
                            <p>活动宣言：{{data[0].right.team.activity}}</p>
                        </div>
                        <div class="imgmove text-center">
                            <div class="pt">
                               <img :src="imgurl" v-for="(imgurl, index1) in data[0].right.img" :key="index1" 
                               :class = "curindex0 == index1 ? 'img-z-index v-db' : '' " class="v-img" />
                                <div class="pt-btn">                      
                               <button type="button" v-for="(imgurl2, index2) in data[0].right.img" 
                               :key="index2" 
                               :class = " curindex0 == index2 ? 'bu-active' : ''" class="v-btn"
                                @click="btnclcik0(index2)" ></button>
                               </div>   
                           </div>
                        </div>
                        <div class="sh">
                        <button class="btn btn-success" v-html="data[0].right.state == 0 ? '审核' : '已审核' "></button>
                        </div>
                    </div>
                </li>
                 <li  class="flex">
                    <div class="left">
                        <video :src="data[1].videourl" controls width= 90% height = 90%></video>
                    </div>
                    <div class="right flex">
                        <div class="team">
                            <p>{{data[1].right.team.name}}</p>
                            <p v-html="data[1].right.team.state == 1 ? '已审核通过' : '审核未通过'"></p>
                            <p>负责人：{{data[1].right.team.mobile}}</p>
                            <p>活动宣言：{{data[1].right.team.activity}}</p>
                        </div>
                        <div class="imgmove text-center">
                            <div class="pt">
                                <img :src="imgurl" v-for="(imgurl, index1) in data[1].right.img" 
                                :key="index1" 
                                :class = "curindex1 == index1 ? 'img-z-index v-db' : '' "  class="v-img" />  
                                <div class="pt-btn">                      
                               <button type="button" v-for="(imgurl2, index2) in data[1].right.img" 
                               :key="index2" 
                               :class = " curindex1 == index2 ? 'bu-active' : ''" 
                               class="v-btn"
                               v-on:click="btnclcik1(index2)"  ></button>
                               </div>   
                           </div>
                        </div>
                        <div class="sh">
                        <button class="btn btn-success" v-html="data[1].right.state == 0 ? '审核' : '已审核' "></button>
                        </div>
                    </div>
                </li>
                 <li class="flex">
                    <div class="left">
                        <video :src="data[2].videourl" controls width= 90% height = 90%></video>
                    </div>
                    <div class="right flex">
                        <div class="team">
                            <p>{{data[2].right.team.name}}</p>
                            <p v-html="data[2].right.team.state == 1 ? '已审核通过' : '审核未通过'"></p>
                            <p>负责人：{{data[2].right.team.mobile}}</p>
                            <p>活动宣言：{{data[2].right.team.activity}}</p>
                        </div>
                        <div class="imgmove text-center">
                            <div class="pt">
                                <img :src="imgurl" v-for="(imgurl, index1) in data[2].right.img" 
                                :key="index1" 
                                :class = "curindex2 == index1 ? 'img-z-index v-db' : '' "
                                class="v-img"
                                 />  
                                <div class="pt-btn">                      
                               <button type="button" v-for="(imgurl2, index2) in data[2].right.img" 
                               :key="index2" 
                               :class = " curindex2 == index2 ? 'bu-active' : ''"  
                               class="v-btn"
                               v-on:click="btnclcik2(index2)"
                            ></button>
                               </div>   
                           </div>
                        </div>
                        <div class="sh">
                        <button class="btn btn-success" v-html="data[2].right.state == 0 ? '审核' : '已审核' "></button>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="footer-elp text-center">
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li>
                <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li>
                <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
</nav>
    </div>
    </div>
</template>
<script>
import webheader from './header'
export default {
    name:'bigdata',
    components:{
       webheader
    },
    data(){
        return{
            navname:'addteam',
            name:'添加队伍',
            curindex0:0,
            curindex1:0,
            curindex2:0,
            data:[
                {
                    videourl:'../../assets/web/video/b9d7ba63f2201b62f642753eca90038c.mp4',//视频路径
                    right:{
                        team:{
                            name:'队伍1', //队伍名称1
                            state:'1',//队伍状态：是否审核通过  0 未通过 1 通过
                            mobile:'1236547102',//负责人手机号
                            activity:'加油，冲啊'//活动宣言

                        },
                        img:['','',''],//图片的路径及个数
                        state:0,//审核状态   0 未审核 1 已审核
                    }
                },
                {
                    videourl:'',
                    right:{
                        team:{
                            name:'队伍2', 
                            state:'2',
                            mobile:'1236547102',
                            activity:'加油，冲啊'

                        },
                        img:['','',''],
                        state:0,
                    }
                },
                {
                    videourl:'',
                    right:{
                        team:{
                            name:'队伍3', 
                            state:'1',
                            mobile:'1236547102',
                            activity:'加油，冲啊'

                        },
                        img:['','','','','',''],
                        state:0,
                    }
                }
            ]
            
        }
    },
     methods:{
                btnclcik0(index){
                   this.curindex0 = index
                },
                btnclcik1(index){
                    this.curindex1 = index
                },
                btnclcik2(index){
                    this.curindex2 = index
                }
                }
}
</script>
<style scoped>
@import '../../assets/web/css/data.css';
</style>