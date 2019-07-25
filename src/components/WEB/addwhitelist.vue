<!--白名单添加 -->
<template>
    <div class="addwhitelist">
    <div class="content"> 
        <p class="header">添加白名单</p>
        <div class="body">
        <label for ="name">姓名</label>
        <input type="text" id="name" v-model="name" placeholder="请输入姓名" />
        </div>
         <div class="body">
        <label for ="boile">手机号</label>
        <input type="text" id="boile" v-model="boile" placeholder="请输入手机号" />
        </div>
         <div class="body">
        <label for ="cardid">身份证号</label>
        <input type="text" id="cardid" v-model="cardid" placeholder="请输入身份证号" />
        </div>
         <div class="body">
        <label for ="birthday">生日</label>
        <input type="text" id="birthday" v-model="birthday" placeholder="请输入生日" />
        </div>
         <div class="body dropdown">
        <label for ="lv">级别</label>
        <input 
        type="type" 
        id="lv" 
        v-model="lv" 
        data-toggle="dropdown"
		aria-haspopup="true"
		aria-expanded="false" 
        placeholder="请选择级别" />
        <span class="caret cc"></span>
        <ul 
        class="dropdown-menu" 
        aria-labelledby="lv"
        >
            <li 
            v-for="(item, index) in dropmenu"
            :key="index"
            v-html="item"
            @click="lv = item"
            ></li>
        </ul>
        </div>
        <div class="bodyla text-center">
            <button class="btn btn-primary">确认添加</button>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'addwhitelist',
    data(){
        return {
            name:'',
            boile: '',
            cardid: '',
            birthday: '',
            lv: '',
            dropmenu:['Lv1', 'Lv2', 'Lv3', 'Lv4', 'Lv5']
        }
    }
}
</script>
<style scoped>
label[for]{
padding-right:10px;
width:70px;
text-align: right;
}
.addwhitelist{
    padding-top:7%;
}
.addwhitelist .content{
    color:#6c6c6c;
    margin: 0 auto;
    box-shadow: 0 0 2px rgba(0, 0, 0, .6);
    width:500px;
}
.addwhitelist .header{
        font-size:120%;
        padding:10px 0;
        border: 1px solid #ccc;
        text-align:center;
        letter-spacing: .5em;
}
.body{
line-height: 2;
margin-top:20px;
padding-left:40px;
}
.bodyla{
    margin: 30px 0 0 0;
    padding-bottom:20px;
}
.text-center{
    text-align: center;
}
input{
border: 1px solid #ccc;
box-shadow: 0 0 1px #ccc;
transition: border-color .35s,box-shadow .35s;
padding-left:8px;
width:calc(100% - 180px)
}
input:focus{
box-shadow: 0 0 1px rgba(102,175,233,.6);
border-color: #66afe9;
} 
.dropdown-menu{
    top:90%!important;
    left:110px!important;
}
.dropdown-menu li{
	padding-left:8px;
	line-height:2;
	cursor: pointer;
	color:#666;
}
.dropdown-menu li:hover{
	background-color:#259dff;
	color:#fff;
}
.cc{
    margin-left: -20px !important;
}
</style>


