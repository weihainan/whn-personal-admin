<template>

  <div id="charge_wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>我的功能</el-breadcrumb-item>
      <el-breadcrumb-item>记账功能</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="main">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="账目表" name="first">
          <div class="margin-style">
            <el-button type="primary" @click="dialogFormVisible = true">记一笔</el-button>
            <hr class="vertical-line"/>
            <el-select v-model="selectedMonthAndYear" placeholder="请选择">
              <el-option v-for="item in yearAndMonthOptions" :key="item.time" :label="item.time"
                         :value="item.time"></el-option>
            </el-select>
            <el-button type="primary" @click="searchForList()">查 询</el-button>
          </div>

          <el-table :data="dataList.items" stripe border>
            <el-table-column label="日期">
              <template scope="scope">
                <el-icon name="time"></el-icon>
                <span style="margin-left: 10px">{{ dateUtils.getLocalTime(scope.row.create_time/1000) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="金额(￥)"></el-table-column>
            <el-table-column label="类型">
              <template scope="scope">{{ typeItems[scope.row.type] }}</template>
            </el-table-column>
            <el-table-column prop="label" label="标签"></el-table-column>
            <el-table-column prop="mark" label="备注"></el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <template v-if="dataList.total > 0">
            <el-pagination style="float:right;" class="margin-style"
                           layout="total, prev, pager, next, jumper" :total="dataList.total" :page-size="size"
                           @current-change="handleCurrentChange"></el-pagination>
          </template>
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
          <el-radio class="radio" v-model="chargeForm.type" :label="disbursements">支出</el-radio>
          <el-radio class="radio" v-model="chargeForm.type" :label="receipts">收入</el-radio>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-select v-model="chargeForm.label" placeholder="请选择">
            <el-option v-for="item in typesOptions" :key="item.name" :label="item.name"
                       :value="item.name"></el-option>
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

  import {addCharge, deleteCharge, yearAndMonth, listCharges, chargeLabelList} from '../api/getData'
  import delError from '../config/error'
  import dateUtils from '../config/dateUtils'

  export default{
    data(){
      return {
        dateUtils: dateUtils,

        activeName: 'first',
        dialogFormVisible: false,
        labelPosition: 'left',
        formLabelWidth: '120px',
        receipts: 'receipts',
        typeItems: {
          disbursements: '支出',
          receipts: '收入'
        },

        size: 30,
        page: 1,
        chargeForm: {
          amount: 0.00,
          type: 'disbursements',
          mark: '',
          label: ''
        },
        yearAndMonthOptions: [],
        selectedMonthAndYear: '',
        typesOptions: [],
        dataList: {
          items: [],
          total: 0
        },
      };
    },
    methods: {
      handleCurrentChange(page){
        this.page = page;
        this.initDataList(this.page, this.size, this.selectedMonthAndYear)
      },
      cancelChargeForm(){
        this.chargeForm = {
          amount: 0.00,
          type: 'disbursements',
          mark: '',
          label: ''
        };
        this.dialogFormVisible = false;
      },
      async submitChargeForm(){
        let result = await addCharge(this.chargeForm);
        if (result.status == 200) {
          this.dataList = result.data;
        } else {
          delError({vm: this, result: result});
        }
        this.chargeForm = {
          amount: 0.00,
          type: 'disbursements',
          mark: '',
          label: ''
        };
        this.initDataList(this.page, this.size, this.selectedMonthAndYear);
        this.dialogFormVisible = false;
      },

      async searchForList(){
        this.initDataList(this.page, this.size, this.selectedMonthAndYear);
      },

      async initTypesOptions(){
        let data = {all: true};
        let result = await chargeLabelList(data);
        if (result.status == 200) {
          this.typesOptions = result.data.items;
        } else {
          delError({vm: this, result: result});
        }
      },

      async initYearAndMonthOptions(){
        let data = {date: new Date()};
        let result = await yearAndMonth(data);
        if (result.status == 200) {
          this.yearAndMonthOptions = result.data;
          if (this.yearAndMonthOptions.length > 0) {
            this.yearAndMonthOptions.unshift({time: '-- 请选择 --'});
          }
        } else {
          delError({vm: this, result: result});
        }
      },

      async initDataList(page, size, yearAndMonth){
        let data = {page: page, size: size};
        if (yearAndMonth && yearAndMonth !== '-- 请选择 --') {
          data['year_and_month'] = yearAndMonth;
        }
        let result = await listCharges(data);
        if (result.status == 200) {
          this.dataList = result.data;
        } else {
          delError({vm: this, result: result});
        }
      }
    },
    mounted(){
      // 在这发起后端请求，拿回数据，配合路由钩子做一些事情
      this.initTypesOptions();
      this.initYearAndMonthOptions();
      this.initDataList(this.page, this.size, this.selectedMonthAndYear);
    },
  }
</script>

<style scoped>

  .main {
    margin-top: 20px;
  }

  .margin-style {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .vertical-line {
    height: 40px;
    width: 1px;
    border-right: 1px;
    color: #D5D5D5;
    margin-left: 10px;
    margin-right: 12px;
    display: inline;
  }
</style>
