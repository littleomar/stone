<template>
    <div class="user-list-wrapper">
      <el-table
        border
        :data="userList.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
        :cell-style="{wordWrap: 'break-word'}"
        style="width: 1050px;margin: 10px">
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
        prop="region"
        label="地区"
        width="180">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话"
          width="490">
          <template slot="header" slot-scope="scope">
            <span>电话</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" plain @click="addUser" align="right">添加用户</el-button>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          align="center">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              placeholder="输入关键字搜索"/>
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
    name: "UserList",
    data() {
      return {
        userList: [],
        search: ''
      }
    },
    async mounted() {
      let userRes = (await axios.get('http://127.0.0.1:3000/api/customer/info')).data
      userRes.map(item=>{
        item.tel = item.telephone.join(' , ')
      })
      this.userList = userRes
    },
    methods: {
      handleInfo(index) {
        this.$router.push({ name: 'UserInfo', params: { id: index }})
      },
      addUser() {
        this.$router.push({ name: 'AddUser'})

      },
      async handleDelete(row) {
        const _self = this
        this.$confirm('您确定要删除该客户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.userList.map((item,index)=>{
            if (item.id === row.id) {
              _self.userList.splice(index, 1);
            }
          })
          await axios.delete(`http://127.0.0.1:3000/api/customer/delete?id=${row.id}`)
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
