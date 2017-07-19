<template>
  <div d="wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>记账标签</el-breadcrumb-item>
    </el-breadcrumb>

    <div id="label_content">

      <el-button type="primary" @click="dialogFormVisible = true" class="margin-style">添加标签</el-button>

      <el-table :data="dataList.items" stripe border>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="mark" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p></p>
      <template v-if="dataList.total > 0">
        <el-pagination style="float:right;" class="margin-style"
                       layout="total, prev, pager, next, jumper" :total="dataList.total" :page-size="size"
                       @current-change="handleCurrentChange"></el-pagination>
      </template>
    </div>

    <el-dialog title="新账目" :visible.sync="dialogFormVisible">
      <el-form :model="chargeForm" :label-position="labelPosition">
        <el-form-item label="名称">
          <el-input v-model="empty.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="empty.mark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelChargeForm()">取 消</el-button>
        <el-button type="primary" @click="submitChargeForm()">确 定</el-button>
      </div>
    </el-dialog>

  </div><!-- end wrapper -->
</template>

<script>
  import {chargeLabelList, addChargeLabel, deleteChargeLabel} from '../api/getData'
  import delError from '../config/error'

  export default{
    data(){
      let data = {
        dataList: {
          items: [],
          total: 0
        },
        dialogFormVisible: false,
        labelPosition: 'right',
        size: 10,
        currentPage: 1,
        empty: {
          name: '',
          mark: '',
        }
      };
      return data;
    },
    methods: {
      async deleteRow(index) {
        let row = this.dataList.items[index];
        if (!row) {
          return;
        }
        let result = await deleteChargeLabel(row.id);
        if (result.status == 200) {
          this.initData(this.currentPage, this.size);
        } else {
          delError({vm: this, result: result});
        }
      },
      cancelChargeForm(){
        this.empty = {
          name: '',
          mark: '',
        };
        this.dialogFormVisible = false;
      },
      async submitChargeForm(){
        let result = await addChargeLabel(this.empty);
        if (result.status == 200) {
          this.dataList = result.data;
        } else {
          delError({vm: this, result: result});
        }
        this.empty = {
          name: '',
          mark: '',
        };
        this.dialogFormVisible = false;
        this.initData(this.currentPage, this.size);
      },
      handleCurrentChange(page){
        this.currentPage = page;
        this.initData(this.currentPage, this.size)
      },
      async initData(pageValue, sizeValue){
        let data = {};
        data['page'] = pageValue - 1;
        data['size'] = sizeValue;
        let result = await chargeLabelList(data);
        if (result.status == 200) {
          this.dataList = result.data;
        } else {
          delError({vm: this, result: result});
        }
        // this.$store.dispatch('chargeLabelList', {page: pageValue - 1, size: sizeValue, vm: this,});
      },
    },
    components: {},
    mounted(){
      // 在这发起后端请求，拿回数据，配合路由钩子做一些事情
      this.initData(this.currentPage, this.size)
    },
    computed: {},
  }
</script>

<style scoped>

  #label_content {
    margin-top: 10px;
  }

  .margin-style {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
