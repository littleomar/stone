<template>
  <div class="add-type">
    <el-form label-position="left" label-width="80px" :model="kindInfo" style="width: 350px">
      <el-form-item label="类型">
        <el-select v-model="kindInfo.type" placeholder="请选择" value="" style="width: 220px">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="代号">
        <el-input v-model="kindInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="名字">
        <el-input v-model="kindInfo.nickname"></el-input>
      </el-form-item>
      <el-button type="primary" @click="addKind">添加</el-button>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "AddKind",
    data() {
      return {
        typeOptions: [],
        kindInfo: {}
      }
    },
    async mounted() {
      let _self = this;
      let typeRes = (await axios.get(`${process.env.API_BASE}/api/goods/typeInfo`)).data;
      typeRes.map(type => {
        _self.typeOptions.push({
          value: type.id,
          label: type.typeName
        })
      })
    },
    methods: {
      async addKind() {
        await axios.post(`${process.env.API_BASE}/api/goods/kind/add`,this.kindInfo)
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
    }
  }
</script>

<style scoped>

</style>
