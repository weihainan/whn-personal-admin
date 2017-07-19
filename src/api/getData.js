import fetch from '../config/fetch'

const loginUrl = '/v0.1/personal/admins/login';

export const adminLogin = data => fetch({
  apiUrl: loginUrl,
  body: data,
  method: 'POST',
  withAuthToken: false
});

const chargeLabelListUrl = '/v0.1/personal/charge_labels';
const addChargeLabelUrl = '/v0.1/personal/charge_labels';
const deleteChargeLabelUrl = '/v0.1/personal/charge_labels/';

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

const addChargeUrl = '/v0.1/personal/charges';
const deleteChargeUrl = '/v0.1/personal/charges/';
const listChargesUrl = '/v0.1/personal/charges/list';
const yearAndMonthUrl = '/v0.1/personal/charges/year_month';

export const addCharge = data => fetch({
  apiUrl: addChargeUrl,
  body: data,
  method: 'POST',
  withAuthToken: true
});

export const deleteCharge = data => fetch({
  apiUrl: deleteChargeUrl + data,
  body: {},
  method: 'DELETE',
  withAuthToken: true
});

export const yearAndMonth = data => fetch({
  apiUrl: yearAndMonthUrl,
  body: data,
  method: 'GET',
  withAuthToken: true
});

export const listCharges = data => fetch({
  apiUrl: listChargesUrl,
  body: data,
  method: 'POST',
  withAuthToken: true
});
