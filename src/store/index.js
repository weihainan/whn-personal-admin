import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  loginedAdmin: JSON.parse(sessionStorage.getItem('loginedAdmin')) || {},
  chargeLabelList: {total: 0, items: []},
};

const getters = {
  // getAdmin: (state) => state.loginedAdmin,
  // auth:(state) =>{
  //   return state.loginedAdmin.id + '-' + state.loginedAdmin.token;
  // }
};

const actions = {}

const mutations = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})


// // 状态值的改变方法,操作状态值
// // 提交mutations是更改Vuex状态的唯一方法
// const mutations = {
//   setAdmin: (state, {admin}) => {
//     state.logined_admin = admin
//   }
// };
//
// // actions:Actions 即是定义提交触发更改信息的描述，
// // 常见的例子有从服务端获取数据，在数据获取完成后会调用store.commit()来调用更改 Store 中的状态。
// // 可以在组件中使用dispatch来发出 Actions。
// // 所有关于状态的改变都通过 Action 进行而不是直接修改
// const actions = {};
//
// // actions: {
// //   LOAD_PROJECT_LIST: function ({ commit }) {
// //     axios.get('/secured/projects').then((response) => {
// //       commit('SET_PROJECT_LIST', { list: response.data })
// //     }, (err) => {
// //       console.log(err)
// //     })
// //   }
// // },
// // this.$store.dispatch('LOAD_PROJECT_LIST')
//
// // state 定义了应用状态的数据结构，同样可以在这里设置默认的初始状态。
// const state = {
//   logined_admin: null,
// };
//
// // Getters 允许组件从 Store 中获取数据
// // 在store中定义getters（可以认为是store的计算属性）。Getters接收state作为其第一个函数
// const getters = {
//   getAdmin: state => {
//     return state.logined_admin
//   }
// };
//
// const modules = {};
//
// const store = new Vuex.Store({
//   state,
//   actions,
//   mutations,
//   getters,
//   modules,
// });
//
// export default store;


// 分模块
//
// const moduleA = {
//   state: { ... },
//   mutations: { ... },
//   actions: { ... },
//   getters: { ... }
// }
//
// const moduleB = {
//   state: { ... },
//   mutations: { ... },
//   actions: { ... }
// }
//
// const store = new Vuex.Store({
//   modules: {
//     a: moduleA,
//     b: moduleB
//   }
// })
//
// store.state.a // -> moduleA 的状态
// store.state.b // -> moduleB 的状态
