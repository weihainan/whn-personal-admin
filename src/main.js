import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store/index';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// //import '../static/css/theme-green/index.css';       // 浅绿色主题

Vue.use(ElementUI);
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
