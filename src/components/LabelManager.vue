<template>
  <div d="wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>记账标签</el-breadcrumb-item>
    </el-breadcrumb>

    <div id="label_content">

      <el-button type="primary" @click="dialogFormVisible = true">添加标签</el-button>

      <el-table :data="chargeLabelList.items" stripe border>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="mark" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p></p>
      <el-pagination style="float:right;"
                     layout="total, prev, pager, next, jumper" :total="chargeLabelList.total" :page-size="size"
                     @current-change="handleCurrentChange"></el-pagination>
    </div>
    <el-dialog title="新账目" :visible.sync="dialogFormVisible">
      <el-form :model="chargeForm" :label-position="labelPosition">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="empty.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
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

  import {mapState, mapMutations} from 'vuex'

  export default{
    data(){
      let data = {
        dialogFormVisible: false,
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
        let row = this.$store.state.chargeLabelList.items[index];
        if (!row) {
          this.initData(this.currentPage, this.size);
        }
        await this.$store.dispatch('deleteChargeLabel', {id: row.id, vm: this});
        setTimeout(function () {
          this.initData(this.currentPage, this.size);
        }.bind(this), 600);
      },
      cancelChargeForm(){
        this.empty = {
          name: '',
          mark: '',
        };
        this.dialogFormVisible = false;
      },
      async submitChargeForm(){
        await this.$store.dispatch('addChargeLabel', {data: this.empty, vm: this});
        this.empty = {
          name: '',
          mark: '',
        };
        this.dialogFormVisible = false;
        setTimeout(function () {
          this.initData(this.currentPage, this.size);
        }.bind(this), 800);
      },
      handleCurrentChange(page){
        this.currentPage = page;
        this.initData(this.currentPage, this.size)
      },
      initData(pageValue, sizeValue){
        this.$store.dispatch('chargeLabelList', {page: pageValue - 1, size: sizeValue, vm: this,});
      },
    },
    components: {},
    mounted(){
      // 在这发起后端请求，拿回数据，配合路由钩子做一些事情
      this.initData(this.currentPage, this.size)
    },
    computed: {
      ...mapState([
        'chargeLabelList'
      ]),
    },
  }
</script>

<style scoped>

  #label_content {
    margin-top: 10px;
  }
</style>
