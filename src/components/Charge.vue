<template>

  <div id="charge_wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>我的功能</el-breadcrumb-item>
      <el-breadcrumb-item>记账功能</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="main">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="账目表" name="first">
          <chargeTable></chargeTable>
        </el-tab-pane>
        <el-tab-pane label="时间轴" name="second">时间轴</el-tab-pane>
        <el-tab-pane label="报表" name="third">报表</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

  import chargeTable from './internal/ChargeTable.vue'

  export default{
    data(){
      return {
        activeName: 'first',
      }
    },
    components: {
      chargeTable: chargeTable
    }
  }
</script>

<style scoped>

  .main {
    margin-top: 20px;
  }
</style>
