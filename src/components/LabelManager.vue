<template>
  <div d="wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>记账标签</el-breadcrumb-item>
    </el-breadcrumb>

    <div id="label_content">

      <el-button type="primary" @click="dialogFormVisible = true">添加标签</el-button>

      <el-table :data="content.items" stripe border>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="mark" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  export default{
    data(){
      let data = {
        dialogFormVisible: false,
        content: {
          items: [],
          total: 0,
        },
        empty: {
          name: '',
          mark: '',
        }
      };
      return data;
    },
    methods: {
      deleteRow(index) {
        let row = this.content.items[index];
        this.$store.dispatch('deleteChargeLabel', {id: row.id, vm: this});
        this.$store.dispatch('chargeLabelList', {page: 0, size: 20, vm: this,});
      },
      cancelChargeForm(){
        this.empty = {
          name: '',
          mark: '',
        };
        this.dialogFormVisible = false;
      },
      submitChargeForm(){
        this.$store.dispatch('addChargeLabel', {data:this.empty, vm: this});
        this.empty = {
          name: '',
          mark: '',
        };
        this.$store.dispatch('chargeLabelList', {page: 0, size: 20, vm: this,});
        this.dialogFormVisible = false;
      },
    },
    components: {},
    mounted(){
      // 在这发起后端请求，拿回数据，配合路由钩子做一些事情
      this.$store.dispatch('chargeLabelList',
        {page: 0, size: 20, vm: this,});
      this.content = this.$store.state.chargeLabelList
    }
  }
</script>

<style scoped>

  #label_content {
    margin-top: 10px;
  }
</style>
