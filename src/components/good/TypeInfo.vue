<template>
  <div class="type-info">
    <el-form label-position="left" label-width="80px" :model="typeInfo" style="width: 350px">
      <el-form-item label="类型名称">
        <el-input v-model="typeInfo.typeName"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="typeInfo.price"></el-input>
      </el-form-item>
      <el-button type="primary" @click="modify">修改</el-button>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "TypeInfo",
    data() {
      return {
        typeInfo: {}
      }
    },
    async mounted() {
      let typeId = this.$route.params.id
      this.typeInfo = (await axios.get(`${process.env.API_BASE}/api/goods/typeInfo?id=${typeId}`)).data[0]
    },
    methods: {
      async modify() {
        await axios.post(`${process.env.API_BASE}/api/goods/modifyType`,this.typeInfo)
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
