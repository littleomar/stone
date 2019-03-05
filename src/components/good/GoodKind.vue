<template>
  <div class="user-list-wrapper">
    <el-select v-model="type" placeholder="请选择" value="" style="width: 220px" @change="typeSelected(type)">
      <el-option
        v-for="item in typeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-table
      border
      :data="goodKindList"
      style="width: 380px;margin: 10px">
      <el-table-column
        prop="fullname"
        label="货物名称"
        width="180">
      </el-table-column>
      <el-table-column
        width="200"
        align="center">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" plain @click="addKind" align="right">添加货物</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            icon="el-icon-delete"
            circle
            type="danger"
            @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "GoodKind",
    data() {
      return {
        type: '',
        typeOptions: [],
        goodKindList: []
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
      handleInfo(index) {
        this.$router.push({ name: 'TypeInfo', params: { id: index }})
      },
      addKind() {
        this.$router.push({ name: 'AddKind'})

      },
      async handleDelete(row) {
        const _self = this
        this.$confirm('您确定要删除该信息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.goodKindList.map((item,index)=>{
            if (item.id === row.id) {
              _self.goodKindList.splice(index, 1);
            }
          });
          await axios.delete(`http://127.0.0.1:3000/api/goods/kind/delete?id=${row.id}`)
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
      async typeSelected(id) {
        const _self = this
        _self.goodKindList = []
        let kindRes = (await axios.get(`http://127.0.0.1:3000/api/goods/kind/type?id=${id}`)).data
        kindRes.map(item => {
          let label = ''
          let tempObj = {
            fullname: '',
            name: item.name,
            nickname: item.nickname,
            id: item.id,
            type: item.type
          }
          if (item.nickname) {
            if (item.name) {
              label = item.name+'-'+item.nickname
            } else {
              label = item.nickname
            }
          } else {
            label = item.name
          }
          tempObj.fullname = label
          _self.goodKindList.push(tempObj)
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-list-wrapper{
  }
</style>
