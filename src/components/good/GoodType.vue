<template>
  <div class="user-list-wrapper">
    <el-table
      border
      :data="goodTypeList"
      style="width: 561px;margin: 10px">
      <el-table-column
        prop="typeName"
        label="类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="180">
      </el-table-column>
      <el-table-column
        width="200"
        align="center">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" plain @click="addType" align="right">添加类型</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handleInfo(scope.row.id)">查看</el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "GoodType",
    data() {
      return {
        goodTypeList: []
      }
    },
    async mounted() {
      this.goodTypeList = (await axios.get('http://127.0.0.1:3000/api/goods/typeInfo')).data
    },
    methods: {
      handleInfo(index) {
        this.$router.push({ name: 'TypeInfo', params: { id: index }})
      },
      addType() {
        this.$router.push({ name: 'AddType'})

      },
      async handleDelete(row) {
        const _self = this
        this.$confirm('您确定要删除该客户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.goodTypeList.map((item,index)=>{
            if (item.id === row.id) {
              _self.goodTypeList.splice(index, 1);
            }
          });
          await axios.delete(`http://127.0.0.1:3000/api/goods/deleteType?id=${row.id}`)
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-list-wrapper{
  }
</style>
