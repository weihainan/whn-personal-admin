<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            icon: 'el-icon-setting',
            index: 'readme',
            title: '自述'
          },
          {
            icon: 'el-icon-document',
            index: '2',
            title: 'Element Learn',
            subs: [
              {
                index: 'useguide',
                title: '使用指南'
              },
              {
                index: 'elementlearn',
                title: '组件学习'
              }
            ]
          },
          {
            icon: 'el-icon-menu',
            index: '3',
            title: '我的功能',
            subs: [
              {
                index: 'chargeup',
                title: '记账功能'
              },
              {
                index: 'todolist',
                title: '待办任务'
              }
            ]
          },
          {
            icon: 'el-icon-share',
            index: '4',
            title: '外部链接',
            index: 'outlinks'
          },
        ]
      }
    },
    computed: {
      onRoutes(){
        return this.$route.path.replace('/', '');
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: #2E363F;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
