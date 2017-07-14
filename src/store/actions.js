import * as types from './types'
import axios from 'axios'

const baseUrl = 'http://localhost:9088'
const loginUrl = baseUrl + '/v0.1/personal/admins/login';

export default {
  adminLogin({commit}, params) {
    axios.post(loginUrl, params.data).then((res) => {
      commit(types.ADMIN_LOGIN, res.data)
    }).catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        params.vm.$message.error(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        params.vm.$message.error("服务端未响应.");
      }
      params.vm.$message.error("未知错误.");
      console.log(error.config);
    });
  },
  adminLoginOut  ({commit}) {
    commit(types.ADMIN_LOGIN_OUT)
  },
}
