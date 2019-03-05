<template>
    <div class="query-sell">
      <el-form label-position="top" label-width="80px" :model="formLabelAlign" inline style="text-align: left;margin-left: 10px">
        <el-form-item label="选择日期" >
          <el-date-picker
            v-model="formLabelAlign.date"
            type="date"
            value-format="yyyy-MM-dd"
            @change="dateSelected(formLabelAlign.date)"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="搜索">
          <el-input v-model="search"></el-input>
        </el-form-item>
      </el-form>
      <el-table
        border
        :data="receiptList.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
        :cell-style="{wordWrap: 'break-word'}"
        :highlight-current-row="false"
        style="width: 1500px;margin: 10px">
        <el-table-column
          prop="username"
          label="客户姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="goodArr"
          label="货物信息">
          <el-table-column
            label="货物名称" width="120">
            <template slot-scope="scope">
              <p v-for="(good,index) in scope.row.goodArr" :key="index">
                {{good.fullname}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            label="张">
            <template slot-scope="scope">
              <p v-for="(good,index) in scope.row.goodArr" :key="index">
                {{good.count}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            label="米">
            <template slot-scope="scope">
              <p v-for="(good,index) in scope.row.goodArr" :key="index">
                {{good.meter?good.meter: '0'}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            label="单价">
            <template slot-scope="scope">
              <p v-for="(good,index) in scope.row.goodArr" :key="index">
                {{good.price}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            label="出厂日期">
            <template slot-scope="scope">
              <p v-for="(good,index) in scope.row.goodArr" :key="index">
                {{good.goodTime?good.goodTime:'-------------'}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :fit="true"
            label="备注">
            <template slot-scope="scope">
              <p v-for="(good,index) in scope.row.goodArr" :key="index" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis">
                {{good.comments?good.comments:'无'}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalPrice"
            label="总价">
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="date"
          label="出货日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="comments"
          label="备注"
          width="278">
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
    name: "QuerySell",
    data() {
      return {
        receiptList: [],
        receiptListReal: [],
        search: '',
        formLabelAlign: {}
      }
    },
    async mounted() {
      this.receiptList = (await axios.get(`${process.env.API_BASE}/api/goods/sell/query`)).data.receiptList
      this.receiptListReal = this.receiptList
    },
    methods: {
      async handleDelete(item) {

        const _self = this
        this.$confirm('您确定要删除该信息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await axios.delete(`${process.env.API_BASE}/api/goods/sell/delete?id=${item.id}`)

          _self.receiptList = _self.receiptList.filter(receipt=>receipt!==item)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });



      },
      dateSelected (value){
        const _self = this
        this.receiptList = this.receiptListReal
        if (value) {
          this.receiptList = this.receiptList.filter(receipt=>receipt.date === value)
        }
      }
    }

  }

</script>

<style scoped>

</style>
