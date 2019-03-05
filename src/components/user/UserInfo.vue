<template>
    <div class="user-info">
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
        <el-button type="primary" @click="modify">修改</el-button>
      </el-form>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "UserInfo",
    data() {
      return {
        userInfo: {
          telephone: []
        }
      }
    },
    async mounted() {
      let userId = this.$route.params.id
      this.userInfo = (await axios.get(`${process.env.API_BASE}/api/customer/info?id=${userId}`)).data[0]
    },
    methods: {
      async modify() {
        this.userInfo.telephone.map((item,index)=>{
          if (!item.trim())  this.userInfo.telephone.splice(index,1)
        })

        this.userInfo.telephone.filter(tel=>{
          return tel.toString().trim()
        })
        await axios.post(`${process.env.API_BASE}/api/customer/modify`,this.userInfo)
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      }
    }
  }
</script>

<style scoped>

</style>
