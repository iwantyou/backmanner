<!---账号管理--->
<template>
<div class="account">
    <webheader :title="navname" :name="name"></webheader>
    <div class="list">
        <div class="list-item" v-for="(item, index) in accountdata" :key="index">
            <img src="#" class="img">
            <div class="content-right">
                <p>账户姓名：{{item.name}}</p>
                <p class="small">手机号：{{item.mobile}}</p>
                <button class="btn btn-danger fr">删除</button>
            </div>
        </div>
    </div>
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
    name:'account',
    components:{
        webheader
    },
    data(){
        return {
            navname:'addcount',
            name:'添加账户',
            accountdata:[

                {
                    name:'张三',
                    mobile:12375869305
                },
                {
                    name:'张三',
                    mobile:12375869305
                },
                {
                    name:'张三',
                    mobile:12375869305
                },{
                    name:'张三',
                    mobile:12375869305
                }
            ]
        }
    }
}
</script>
<style scoped>
@import '../../assets/web/css/account.css';
</style>


