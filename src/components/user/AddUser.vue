<template>
  <div class="add-user">
    <el-form label-position="left" label-width="80px" :model="userInfo" style="width: 350px">
      <el-form-item label="姓名">
        <el-input v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="userInfo.telephone[0]"></el-input>
        <el-input v-model="userInfo.telephone[1]"></el-input>
        <el-input v-model="userInfo.telephone[2]"></el-input>
        <el-input v-model="userInfo.telephone[3]"></el-input>
        <el-input v-model="userInfo.telephone[4]"></el-input>
      </el-form-item>
      <el-form-item label="地区">
        <el-input v-model="userInfo.region"></el-input>
      </el-form-item>
      <el-button type="primary" @click="addUser">添加</el-button>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "AddUser",
    data() {
      return {
        userInfo: {
          telephone: []
        }
      }
    },
    methods: {
      async addUser() {
        this.userInfo.telephone.map((item,index)=>{
          if (!item.trim())  this.userInfo.telephone.splice(index,1)
        })
        await axios.post(`http://127.0.0.1:3000/api/customer/addUser`,this.userInfo)
        this.$message({
          message: '添加用户成功',
          type: 'success'
        });
      }
    }
  }
</script>

<style scoped>

</style>
