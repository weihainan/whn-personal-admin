<template>

  <div id="charge_wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>我的功能</el-breadcrumb-item>
      <el-breadcrumb-item>记账功能</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="main">
      <el-tabs v-model="activeName" type="card" @tab-click="ontabClick">
        <el-tab-pane label="账目表" name="first">
          <chargeTable></chargeTable>
        </el-tab-pane>
        <el-tab-pane label="时间轴" name="second">
          <chargeTimeLine :date="currentDate"></chargeTimeLine>
        </el-tab-pane>
        <el-tab-pane label="报表" name="third">
          <chargeStatistics></chargeStatistics>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

  import chargeTable from './internal/ChargeTable.vue'
  import chargeTimeLine from './internal/ChargeTimeLIne.vue'
  import chargeStatistics from './internal/chargeStatistics.vue'

  export default{
    data(){
      return {
        currentDate: new Date(),
        activeName: 'first',
      }
    },
    components: {
      chargeTable: chargeTable,
      chargeTimeLine: chargeTimeLine,
      chargeStatistics: chargeStatistics,
    },
    methods: {
      ontabClick(event){
        this.currentDate = new Date()
      }
    }
  }
</script>

<style scoped>

  .main {
    margin-top: 20px;
  }
</style>
