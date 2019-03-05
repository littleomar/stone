<template>
    <div class="buy">
      <el-form label-position="left" label-width="100px" style="text-align: left">
        <el-form-item label="入库时间：">
          <el-date-picker
            v-model="formData.date"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="货物信息：">
          <div class="good-item" v-for="(good,index) in formData.goods" :key="good.key">
            <el-form label-position="top" label-width="80px" :model="good" :inline="true">
              <el-form-item label="货物类型">
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
                <el-select v-model="good.name" placeholder="请选择" value="" style="width: 120px">
                  <el-option
                    v-for="item in good.kindOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="数量">
                <el-input v-model.float="good.count" style="width: 150px">
                  <template slot="append">张</template>
                </el-input>
              </el-form-item>
              <el-form-item label="日期">
                <el-date-picker
                  v-model="good.date"
                  type="date"
                  style="width: 150px"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="备注信息">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入备注"
                  v-model="good.comments">
                </el-input>
              </el-form-item>
              <el-button type="danger" icon="el-icon-delete" class="delete" @click="deleteGood(index)" circle></el-button>
            </el-form>
          </div>
          <div class="add-container"><el-button type="primary" @click="addGoods" icon="el-icon-plus" circle></el-button></div>
        </el-form-item>
        <div class="submit-container">
          <el-button type="primary" @click="submitForm">提交</el-button>
        </div>
      </el-form>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "Buy",
    data() {
      return {
        formData: {
          date: this.dateFtt('yyyy-MM-dd',new Date()),
          goods: []
        },
        typeOptions:[]
      }
    },
    async mounted() {
      let _self = this;
      let typeRes = (await axios.get('http://127.0.0.1:3000/api/goods/typeInfo')).data;
      typeRes.map(type => {
        _self.typeOptions.push({
          value: type.id,
          label: type.typeName
        })
      })
    },
    methods: {
      addGoods() {
        this.formData.goods.push({
          kindOptions: []
        })
      },
      deleteGood(index) {
        this.formData.goods.splice(index,1)
      },
      async typeSelected(type,index) {
        const _self = this
        this.formData.goods[index].kindOptions = []
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
          _self.formData.goods[index].kindOptions.push({
            value: item.id,
            label
          })
        })
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
      async submitForm() {
        const _self = this
        let data = {
          goods: []
        }
        data.date = this.formData.date
        this.formData.goods.map( good => {
          data.goods.push({
            name: good.name,
            count: good.count,
            date: good.date,
            comments: good.comments
          })
        })
        await axios.post('http://127.0.0.1:3000/api/goods/buy/add',data)
        this.formData.goods = []
        this.$message({
          type: 'success',
          message: '货物存储成功'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .buy{
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
