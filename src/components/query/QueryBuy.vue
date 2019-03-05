<template>
  <div class="buy-good-list-wrapper">
    <el-select v-model="date" placeholder="请选择" value="all" @change="dateSelected(date)">
      <el-option
        v-for="item in dateOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-table
      border
      :data="goodList.filter(data => !search || data.fullname.toLowerCase().includes(search.toLowerCase()))"
      :cell-style="{wordWrap: 'break-word'}"
      style="width: 1050px;margin: 10px">
      <el-table-column
        prop="fullname"
        label="货物名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="count"
        label="数量"
        width="99">
      </el-table-column>
      <el-table-column
        prop="goodTime"
        label="出厂日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="buyTime"
        label="入库日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="comments"
        label="备注"
        width="350">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            placeholder="输入关键字搜索"/>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button
            type="danger"
            circle
            @click="handleDelete(scope.row)"
           icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "QueryBuy",
    data() {
      return {
        date: '',
        dateOptions: [
          {
            value: 'all',
            label: '全部'
          }
        ],
        goodListReal:[],
        goodList: [],
        search: ''
      }
    },
    async mounted() {
      const _self = this
      let buyGoodRes = (await axios.get('http://127.0.0.1:3000/api/goods/buy/query')).data
      buyGoodRes.dateArr.map( date =>{
        _self.dateOptions.push({
          label: date,
          value: date
        })
      })
      buyGoodRes.goodArr.map( good => {
        _self.goodList.push({
          fullname: good.fullname,
          goodTime: good.goodTime,
          buyTime: good.buyTime,
          count: good.count,
          comments: good.comments,
          id: good.id
        })
      })

      _self.goodListReal = _self.goodList
    },
    methods: {
      async handleDelete(good) {
        const _self = this


        this.$confirm('您确定要删除该该信息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

          this.goodList.map((item,index)=>{
            if (item.id === good.id) {
              _self.goodList.splice(index, 1);
            }
          })

          this.goodListReal = this.goodList
          await axios.delete(`http://127.0.0.1:3000/api/goods/buy/delete?id=${good.id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(async () => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })



      },
      dateSelected(date) {
        this.goodList = this.goodListReal
        if (date !== 'all') {
          this.goodList = this.goodList.filter( item => item.buyTime === date)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .buy-good-list-wrapper{

  }
</style>
