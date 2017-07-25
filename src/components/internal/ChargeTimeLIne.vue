<template>
  <div d="wrapper">
    <ul class="timeline">
      <h2></h2>
      <template v-for="item in dataList.items">
        <li>
          <div class="disbursements">
            <span class="date">{{dateUtils.getLocalDateTime(item.create_time/1000) }}</span>
            <span class="rmb">{{item.amount}} <el-tag type="success">{{item.label}}</el-tag></span>
          </div>
          <div class="number"></div>
        </li>
      </template>
    </ul>
  </div><!-- end wrapper -->
</template>

<script>

  import {listCharges} from '../../api/getData'
  import delError from '../../config/error'
  import dateUtils from '../../config/dateUtils'

  export default{
    data(){
      let data = {
        dateUtils: dateUtils,
        dataList: {
          items: [],
          total: 0
        },
        size: 10,
        page: 1,
      };
      return data;
    },
    props: {
      date: Date
    },
    methods: {
      async initDataList(page, size){
        let data = {page: page, size: size};
        let result = await listCharges(data);
        if (result.status == 200) {
          this.dataList = result.data;
        } else {
          delError({vm: this, result: result});
        }
      },
      init(curVal, oldVal){
        alert(1)
        this.initDataList(this.page, this.size);
      }
    },
    components: {},
    mounted(){
      // 在这发起后端请求，拿回数据，配合路由钩子做一些事情
      this.initDataList(this.page, this.size);
    },
    watch: {
      date: 'init',
    },
  }
</script>

<style scoped>
  ul.timeline {
    list-style-type: none;
    background: url("../../../static/img/line04.gif") repeat-y scroll 128px 0 transparent;
    margin: 50px 0;
    padding: 0;
  }

  ul.timeline li {
    position: relative;
    margin-bottom: 20px;
  }

  ul.timeline h2 {
    background: url(../../../static/img/icon06.gif) #fff no-repeat 100px 0;
    height: 59px;
  }

  ul.timeline li .number {
    position: absolute;
    background: url(../../../static/img/icon07.gif) no-repeat scroll 0 0 transparent;
    width: 25px;
    height: 18px;
    left: 121px;
    line-height: 56px;
    text-align: center;
    color: #fff;
    font-size: 18px;
  }

  ul.timeline li .disbursements {
    position: relative;
    width: 250px;
    height: 40px;
    left: 150px;
    line-height: 56px;
    color: #11b95c;
    font-size: 18px;
  }

  .date {
    color: #11b95c;
  }

  .rmb {
    font-size: 14px;
  }

</style>
