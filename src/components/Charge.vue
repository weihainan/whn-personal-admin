<template>

  <div id="charge_wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>我的功能</el-breadcrumb-item>
      <el-breadcrumb-item>记账功能</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="main">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="账目表" name="first">
          <el-button type="primary" @click="dialogFormVisible = true">记一笔</el-button>
        </el-tab-pane>
        <el-tab-pane label="时间轴" name="second">时间轴</el-tab-pane>
        <el-tab-pane label="报表" name="third">报表</el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="新账目" :visible.sync="dialogFormVisible">
      <el-form :model="chargeForm" :label-position="labelPosition">
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="chargeForm.amount" auto-complete="off">
            <template slot="prepend">RMB</template>
          </el-input>
        </el-form-item>
        <el-form-item label="收支类型" :label-width="formLabelWidth">
          <el-radio class="radio" v-model="chargeForm.type" :label="disbursements">收入</el-radio>
          <el-radio class="radio" v-model="chargeForm.type" :label="receipts">支出</el-radio>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-select v-model="chargeForm.label" placeholder="请选择">
            <el-option v-for="item in labelOptions" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="chargeForm.mark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelChargeForm()">取 消</el-button>
        <el-button type="primary" @click="submitChargeForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        activeName: 'first',
        dialogFormVisible: false,
        labelPosition: 'left',
        formLabelWidth: '120px',
        chargeForm: {
          amount: 0.00,
          type: 'disbursements',
          mark: '',
          label: ''
        },
        labelOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      };
    },
    methods: {
      cancelChargeForm(){
        this.chargeForm = {
          amount: 0.00,
          type: 'disbursements',
          mark: '',
          label: ''
        };
        this.dialogFormVisible = false;
      },
      submitChargeForm(){
        // todo post
        this.$message({
          showClose: true,
          message: '消息提示:记得去真实提交偶.',
          type: 'success',
          duration: 2000,
        });
        this.chargeForm = {
          amount: 0.00,
          type: 'disbursements',
          mark: '',
          label: ''
        };
        this.dialogFormVisible = false;
      },
    }
  }
</script>

<style scoped>

  .main {
    margin-top: 20px;
  }
</style>
