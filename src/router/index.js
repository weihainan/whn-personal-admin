import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/element/ReadMe.vue'], resolve),
        },
        {
          path: '/readme',
          component: resolve => require(['../components/element/ReadMe.vue'], resolve),
        },
        {
          path: '/outlinks',
          component: resolve => require(['../components/element/OutLinks.vue'], resolve),
        },
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/common/Login.vue'], resolve),
    },
  ]
})
