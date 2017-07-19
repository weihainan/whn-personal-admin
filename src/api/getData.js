import fetch from '../config/fetch'

const loginUrl = '/v0.1/personal/admins/login';

const chargeLabelListUrl = '/v0.1/personal/charge_labels';
const addChargeLabelUrl = '/v0.1/personal/charge_labels';
const deleteChargeLabelUrl = '/v0.1/personal/charge_labels/';

export const adminLogin = data => fetch({
  apiUrl: loginUrl,
  body: data,
  method: 'POST',
  withAuthToken: false
});

export const chargeLabelList = data => fetch({
  apiUrl: chargeLabelListUrl,
  body: data,
  method: 'GET',
  withAuthToken: true
});
export const addChargeLabel = data => fetch({
  apiUrl: addChargeLabelUrl,
  body: data,
  method: 'POST',
  withAuthToken: true
});
export const deleteChargeLabel = data => fetch({
  apiUrl: deleteChargeLabelUrl + data,
  body: {},
  method: 'DELETE',
  withAuthToken: true
});

