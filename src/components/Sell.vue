<template>
  <div class="sell">
    <el-form label-position="left" label-width="100px" :model="formLabelAlign" style="text-align: left">
      <el-form-item label="客户信息：">
        <el-form label-position="top" label-width="80px" :model="user" :inline="true">
          <el-form-item label="姓名">
            <el-autocomplete
              class="inline-input"
              v-model="user.name"
              :fetch-suggestions="querySearchUser"
              :trigger-on-focus="false"
              @select="userSelect"
              placeholder="请输入内容"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="电话">
            <el-autocomplete
              class="inline-input"
              v-model="user.telephone"
              :fetch-suggestions="querySearchTel"
              placeholder="请输入电话号码"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="地区">
            <el-input v-model="user.region" style="width: 200px"></el-input>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="日期：">
        <el-date-picker
          v-model="formLabelAlign.date"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="货物信息：">
        <div class="good-item" v-for="(good,index) in goods" :key="good.key">
          <el-form label-position="top" label-width="80px" :model="good" :inline="true">
            <el-form-item label="类型">
              <el-select v-model="good.type" placeholder="请选择" value="" style="width: 120px" @change="typeSelected(good.type,index)">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="货物名称">
              <el-select v-model="good.name" placeholder="请选择" value="" style="width: 120px" @change="kindSelected(index,good.name)">
                <el-option
                  v-for="item in good.kindOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数量">
              <el-input v-model.number="good.count" style="width: 120px">
                <template slot="append">张</template>
              </el-input>
              <el-input v-model.float="good.meter" style="width: 320px">
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
            <el-form-item label="单价" style="width: 100px">
              <el-input v-model.number="good.price"></el-input>
            </el-form-item>
            <el-form-item label="金额" style="width: 150px">
              <el-input v-model.number="good.total">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="货物日期：">
              <el-date-picker
                v-model="good.date"
                align="right"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="备注信息：">
              <el-input
                type="textarea"
                autosize=""
                placeholder="备注信息"
                style="width: 200px"
                v-model="good.comments">
              </el-input>
            </el-form-item>
            <el-button type="danger" icon="el-icon-delete" class="delete" @click="deleteGood(index)" circle></el-button>
          </el-form>
        </div>
        <div class="add-container"><el-button type="primary" @click="addGoods" icon="el-icon-plus" circle></el-button></div>
      </el-form-item>
      <el-form-item label="备注信息：">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="备注信息"
          style="width: 400px"
          v-model="comments">
        </el-input>
      </el-form-item>
      <div class="submit-container">
        <el-button type="primary" v-print="'#printTable'" @click="submitForm">打印</el-button>
        <el-button type="warning" @click="resetForm" >重置</el-button>
      </div>
    </el-form>
    <div id="printTable">
      <h1 class="title">威雅诺、金奇利，易彩丽石英石，晶益佳人造石出库单</h1>
      <div class="my-info">
        <div class="item">订货电话：18049603499、13259858886&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*可定制3m以下板材</div>
      </div>
      <p class="title sell">出&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单</p>
      <div class="user-info">
        <div>出货日期：{{this.formLabelAlign.date}}</div>
        <div>客户名称：{{this.user.name}}</div>
        <div>客户地址：{{this.user.region}}</div>
        <div>客户电话：{{this.user.telephone}}</div>
      </div>
      <table class="table">
        <tr>
          <th>品名</th>
          <th>张</th>
          <th>米</th>
          <th>单价（元）</th>
          <th>批号</th>
          <th>金额（元）</th>
          <th style="width: 150px">备注</th>
        </tr>
        <tr v-for="good in goods" :key="good.key">
          <td>{{good.kindLabel}}</td>
          <td>{{good.count}}</td>
          <td>{{good.meter}}</td>
          <td>{{good.price}}</td>
          <td>{{good.date}}</td>
          <td>{{good.total}}</td>
          <td></td>
        </tr>
        <tr class="money">
          <td colspan="6">合计金额（大写）：{{this.totalMoney.trad}}</td>
          <td>￥：{{this.totalMoney.easy}}</td>
        </tr>
      </table>
      <div class="date-wrapper">
        <div>板材送货人签字：</div>
        <div>欠款客户签字：</div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
      name: "Sell",
      data() {
        return {
          comments: '',
          formLabelAlign: {
            date: this.dateFtt('yyyy-MM-dd',new Date())
          },
          typeOptions: [],
          goods: [],
          user: {},
          totalMoney: {
            easy: 0,
            trad: ''

          },
          userInfo: [],
          userPhone:[]
        }
      },
      async mounted() {


        let userRes = (await axios.get('http://127.0.0.1:3000/api/customer/info')).data;
        userRes.map(item=>{
          item.value = item.username
          delete item.username
          delete item.id
        })
        this.userInfo = userRes


        const _self = this;
        let typeRes = (await axios.get('http://127.0.0.1:3000/api/goods/typeInfo')).data;
        typeRes.map(type => {
          _self.typeOptions.push({
            value: type.id,
            label: type.typeName,
            price: type.price
          })
        })
      },
      methods: {
        addGoods() {
          this.goods.push({
            key: Math.random(),
            kindOptions: []
          })
        },
        deleteGood(index) {
          this.goods.splice(index,1)
        },
        querySearchUser(queryString, cb) {
          let userInfo = this.userInfo;
          if (userInfo) {
            let results = queryString ? userInfo.filter(this.createFilter(queryString)) : userInfo;
            cb(results);
          }
        },
        querySearchTel(queryString, cb) {
          let userTel = this.userPhone;
          let results = queryString ? userTel.filter(this.createFilter(queryString)) : userTel;
          cb(results);
        },
        createFilter(queryString) {
          return (restaurant) => {
            return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          };
        },
        resetForm() {
          this.user = {};
          this.goods = [];
          this.comments = '';
          this.totalMoney = {
            easy: 0,
            trad: ''
          }
        },
        userSelect(value) {
          this.userPhone = []
          for (let i = 0; i< value.telephone.length; ++i ){
            this.userPhone.push({value: value.telephone[i]})
          }
          this.$set(this.user,'region',value.region)
          this.$set(this.user,'telephone',value.telephone[0])
        },
        async typeSelected(type,index) {
          const _self = this
          this.typeOptions.map(item => {
            if (item.value === type ) this.$set(_self.goods[index],'price',item.price)
          })

          this.goods[index].kindOptions = []
          let kindRes = (await axios.get(`http://127.0.0.1:3000/api/goods/kind/type?id=${type}`)).data
          kindRes.map(item => {
            let label = ''
            if (item.nickname) {
              if (item.name) {
                label = item.name+'-'+item.nickname
              } else {
                label = item.nickname
              }
            } else {
              label = item.name
            }
            _self.goods[index].kindOptions.push({
              value: item.id,
              label
            })
          })
        },
        kindSelected(index,id) {
          let temp = this.goods[index].kindOptions.filter(kind=>{
            return kind.value === id
          })
          this.goods[index].kindLabel = temp[0].label
        },
        async submitForm() {


          let data = {
            goods: []
          };
          data.user = this.user
          data.comments = this.comments
          data.date = this.formLabelAlign.date
          this.goods.map(good => {
            data.goods.push({
              name: good.name,
              count: good.count,
              price: good.price,
              meter: good.meter,
              total: good.total,
              date: good.date,
              type: good.type,
              comments: good.comments,
              totalMeter: good.totalMeter
            })
          })


          await axios.post('http://127.0.0.1:3000/api/goods/sell/add',data)
          this.resetForm()
        },
        dateFtt(fmt,date) { //author: meizz
          var o = {
            "M+" : date.getMonth()+1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : date.getSeconds(),                 //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S"  : date.getMilliseconds()             //毫秒
          };
          if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
          for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          return fmt;
        },
        numToStr(n) {
          if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
            return "数据非法";
          var unit = "千百拾亿千百拾万千百拾元", str = "";
          n = n.toString()
          unit = unit.substr(unit.length - n.length);
          for (var i=0; i < n.length; i++)
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
          return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
        }
      },
      watch: {
        totalPrice() {

        }
      },
      computed: {
        totalPrice() {



          let price,count,meter
          for (let i = 0; i< this.goods.length; ++i ) {
            price = this.goods[i].price ? this.goods[i].price : 0
            count = this.goods[i].count ? this.goods[i].count : 0
            meter = this.goods[i].meter ? this.goods[i].meter : 0
            let meterArr = (meter+'').split('+');
            meter = 0
            for (let j = 0 ;j < meterArr.length; j++ ) {
              if (meterArr[j]) meter += parseFloat(meterArr[j])
            }
            this.goods[i].totalMeter = meter
            this.goods[i].total = Math.round(price * ( count + meter/2.4 ))
          }


          const _self = this;
          this.totalMoney = {
            easy: 0,
            trad: ''
          }
          this.goods.map( good =>{
            _self.totalMoney.easy += parseInt(good.total)
          })

          _self.totalMoney.trad = _self.numToStr(_self.totalMoney.easy)
        }
      }
    }
</script>

<style lang="scss" scoped>
.sell{
  #printTable {
    width: 200.5mm;
    box-sizing: border-box;
    display: block;
    padding: 0 10px;
    font-size: 16px;
    .title{
      font-weight: 700;
      text-align: center;
      font-size: 20px;
      font-family: "Kaiti SC", serif;
      &.sell{
        font-size: 18px;
        font-weight: 500;
        font-family: "Microsoft Sans Serif", serif;
      }
    }
    .my-info{
      width: 520px;
      margin: 5px auto;
      text-align: center;
      font-size: 16px;
    }
    .user-info{
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
    }
    .table{
      margin-top: 5px;
      width: 100%;
      border: 1px solid #000;
      border-collapse: collapse;
      tr{
        th,td{
          border: 1px solid #000;
          height: 18px;
          font-size: 16px;
          line-height: 18px;
        }
        .total{
          .total-wrapper{
            width: 100%;
            display: flex;
            justify-content: space-around;
          }
        }
        &.money{
          padding: 0 30px;
        }
      }
    }
    .date-wrapper{
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
      padding-right: 100px;
    }
  }
  .good-item{
    .delete{
      margin-top: 50px;
    }
  }
  .add-container{
    width: 100%;
    text-align: left;
    margin-top: 20px;
  }
  .submit-container{
    width: 100%;
    text-align: center;
  }
}
</style>
