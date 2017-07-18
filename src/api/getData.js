import fetch from '../config/fetch'

const loginUrl = '/v0.1/personal/admins/login';

export const adminLogin = data => fetch({apiUrl: loginUrl, body: data, method: 'POST'});
