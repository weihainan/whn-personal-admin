import * as types from './types'
import axios from 'axios'

const baseUrl = 'http://localhost:9088'
const loginUrl = baseUrl + '/v0.1/personal/admins/login';
const chargeLabelListUrl = baseUrl + '/v0.1/personal/charge_labels';
const addChargeLabelUrl = baseUrl + '/v0.1/personal/charge_labels';
const deleteChargeLabelUrl = baseUrl + '/v0.1/personal/charge_labels/';

export default {
  // adminLogin({commit}, params) {
  //   axios.post(loginUrl, params.data).then((res) => {
  //     commit(types.ADMIN_LOGIN, res.data)
  //   }).catch(error => {
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //       params.vm.$message({
  //         showClose: true,
  //         message: error.response.data.message,
  //         type: 'error',
  //         duration: 2000,
  //       });
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //       // http.ClientRequest in node.js
  //       console.log(error.request);
  //       params.vm.$message.error("服务端未响应.");
  //     }
  //   });
  // },
  adminLoginOut  ({commit}) {
    commit(types.ADMIN_LOGIN_OUT)
  },

  chargeLabelList({commit}, params){
    let config = {
      //baseURL: 'https://some-domain.com/api/',
      timeout: 3000,
      headers: {'Authorization': params.vm.$store.getters.auth}
    };
    let url = chargeLabelListUrl + '?page=' + params.page + '&size=' + params.size;
    axios.get(url, config).then((res) => {
      commit(types.CHARGE_LABEL_LIST, res.data)
    }).catch(error => {
      params.vm.$message.error("发现错误.");
    });
  },

  deleteChargeLabel({commit}, params){
    let config = {
      //baseURL: 'https://some-domain.com/api/',
      timeout: 3000,
      headers: {'Authorization': params.vm.$store.getters.auth}
    };
    let url = deleteChargeLabelUrl + params.id;
    axios.delete(url, config).then((res) => {
      //commit(types.CHARGE_LABEL_LIST, res.data)
    }).catch(error => {
      params.vm.$message.error("发现错误.");
    });
  },

  addChargeLabel({commit}, params){
    let config = {
      //baseURL: 'https://some-domain.com/api/',
      timeout: 3000,
      headers: {'Authorization': params.vm.$store.getters.auth}
    };
    let url = deleteChargeLabelUrl;
    axios.post(url, params.data, config).then((res) => {
      //commit(types.CHARGE_LABEL_LIST, res.data)
    }).catch(error => {
      params.vm.$message.error("发现错误.");
    });
  },
}
