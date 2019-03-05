<template>
  <div class="add-type">
    <el-form label-position="left" label-width="80px" :model="typeInfo" style="width: 350px">
      <el-form-item label="类型名称">
        <el-input v-model="typeInfo.typeName"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="typeInfo.price"></el-input>
      </el-form-item>
      <el-button type="primary" @click="addType">添加</el-button>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "AddType",
    data() {
      return {
        typeInfo: {}
      }
    },
    methods: {
      async addType() {
        await axios.post(`http://127.0.0.1:3000/api/goods/addType`,this.typeInfo)
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
