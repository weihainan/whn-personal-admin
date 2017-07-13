import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

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
          component: resolve => require(['../components/ReadMe.vue'], resolve),
        },
        {
          path: '/readme',
          component: resolve => require(['../components/ReadMe.vue'], resolve),
        },
        {
          path: '/outlinks',
          component: resolve => require(['../components/OutLinks.vue'], resolve),
        },
        {
          path: '/useguide',
          component: resolve => require(['../components/elements/UseGuide.vue'], resolve),
        },
        {
          path: '/chargeup',
          component: resolve => require(['../components/Charge.vue'], resolve),
        },
        {
          path: '/assignment',
          component: resolve => require(['../components/Assignment.vue'], resolve),
        },
        {
          path: '/adminmanager',
          component: resolve => require(['../components/AdminManager.vue'], resolve),
        },
        {
          path: '/labelmanager',
          component: resolve => require(['../components/LabelManager.vue'], resolve),
        },
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/common/Login.vue'], resolve),
    },
    {
      path: '*',
      redirect: '/login'
    },
  ]
})
