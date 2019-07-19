<!-- 规则设置-->
<template>
    <div style="height:100%;width:100%;">
    <div class="rule flex-col justify-around">
      <div class="base-set rule-flex-33" >
        <div class="header">基本设置</div>
        <div class="vote-times">
            <span class="times">投票次数</span>
            <div class="dropdown vote-db-block">
                <button id="dLabel" class="btn btn-default" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 {{name}}
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dLabel" @click="show($event)">
                   <li>每天1次</li>
                   <li>每天2次</li>
                   <li>每天5次</li>
                </ul>
            </div>
            <div class="vote-compu-rule">
                <span class="times" style="vertical-align:top;margin-top:15px;display:inline-block">计算规则</span>
                <div class="vote-radio">
                    <div class="radio" v-for="(item, index) in radiodata"  :key="index">
                        <label @change="value(item.value)">
                            <i class="vote-active common" v-if="item.value == opt"></i>
                            <i class="vote-unactive common" v-else></i>
                         <input type="radio" name="optionsRadios"  :value="item.value" style="display:none;">
                                 {{item.option}}
                         </label>
                    </div>
                </div>

            </div>
        </div>
      </div>
      <div class="card-set rule-flex-25">
        <div class="header">卡别设置</div>
        <div class="card">
            <div  class="card-fe">
                <span class="times">普卡客户</span>
                <div class="dropdown vote-db-block">
                <button id="dLabel1" class="btn btn-default" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 {{cardf}}
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dLabel1"  @click="cardfeature($event)">
                   <li>每天1次</li>
                   <li>每天2次</li>
                   <li>每天3次</li>
                </ul>
            </div>
            </div>
            <div  class="card-fe">
                <span class="times">金卡客户</span>
                <div class="dropdown vote-db-block">
                <button id="dLabel2" class="btn btn-default" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 {{cardf1}}
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dLabel2"   @click="cardfeature1($event)">
                   <li>每天1次</li>
                   <li>每天2次</li>
                   <li>每天3次</li>
                </ul>
            </div>
            </div>
        </div>
      </div>
      <div class="whitelist-set rule-flex-25">
        <div class="header">白名单设置</div>
        <div class="card">
            <div  class="card-fe">
                <span class="times white">白名单客户5万以上</span>
                <div class="dropdown vote-db-block">
                <button id="dLabel2" class="btn btn-default" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 {{white1}}
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dLabel2"  @click="whiteword1($event)">
                   <li>每天1次</li>
                   <li>每天2次</li>
                   <li>每天3次</li>
                </ul>
            </div>
            </div>
            <div  class="card-fe">
                <span class="times white">白名单客户510万以上</span>
                <div class="dropdown vote-db-block">
                <button id="dLabel3" class="btn btn-default" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 {{white2}}
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dLabel3"   @click="whiteword2($event)">
                   <li>每天1次</li>
                   <li>每天2次</li>
                   <li>每天3次</li>
                </ul>
            </div>
            </div>
        </div>
      </div>
    </div>
    <div class="save text-center">
        <button type="button" class=" btn btn-success">保存</button>
    </div>
    </div>
</template>
<script>
export default {
    name:'webrule',
    data(){
        return{
            name:'请选择',
            cardf:'请选择',
            cardf1:'请选择',
            white1:'请选择',
            white2:'请选择',
            cur: 0, // 单选按钮选中的索引
            radiodata:[
                {
                    value:'0',
                    option:'活动周期内每队每天'
                },
                {
                    value:'1',
                    option:'活动周期内每天'
                },
                {
                    value:'2',
                    option:'活动周期内'
                }
            ],
            opt:0, // 单选按钮选中时的value
            carddata:[
                {
                    name:'普卡客户',
                    select:[1,2,3]
                },{
                    name:'金卡客户',
                    select:[1,2,3]
                }
            ]
        }
    },
    methods:{
        show(e){
            this.name = e.target.innerText
        },
        value(opt){
            this.opt = opt
        },
        cardfeature(e){
            this.cardf = e.target.innerText
        },
        cardfeature1(e){
            this.cardf1 = e.target.innerText
        },
        whiteword1(e){
            this.white1 = e.target.innerText
        },
        whiteword2(e){
            this.white2 = e.target.innerText
        }

    }
}
</script>
<style scoped>
@import "../../assets/web/css/rule.css";
</style>

