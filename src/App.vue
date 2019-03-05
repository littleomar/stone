<template>
  <el-container id="app">
    <el-aside width="150px">
      <div class="router-container active" @click="selectClick"><router-link class="router-item" to="/sell">开票</router-link></div>
      <div class="router-container" @click="selectClick"><router-link class="router-item" to="/buy">入库</router-link></div>
      <div class="router-container" @click="selectClick"><router-link class="router-item" to="/query/sell">查询出售</router-link></div>
      <div class="router-container" @click="selectClick"><router-link class="router-item" to="/query/buy">查询入库</router-link></div>
      <div class="router-container" @click="selectClick"><router-link class="router-item" to="/print/detail">打印详单</router-link></div>
      <div class="router-container" @click="selectClick"><router-link class="router-item" to="/query/user">用户信息</router-link></div>
      <div class="router-container" @click="selectClick"><router-link class="router-item" to="/good/type">货物类型</router-link></div>
      <div class="router-container" @click="selectClick"><router-link class="router-item" to="/good/kind">货物种类</router-link></div>

    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeName: 'second'
    }
  },
  methods: {
    selectClick(e) {
      for (let i = 0; i < 8; ++i ) {
        e.currentTarget.parentNode.children[i].className = 'router-container'
      }
      e.currentTarget.className = 'router-container active'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .router-container{
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    padding-right: 3px;
    &.active{
      border-right: 3px solid #409EFF;
      background-color: #eee;
      padding-right: 0;
    }
    .router-item{
      display: inline-block;
      width: 100%;
      line-height: 40px;
      color: #000;
      text-decoration: none;
      font-size: 16px;
    }
  }
}
</style>
