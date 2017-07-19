import fetch from 'isomorphic-fetch'
import auth from './auth'

const baseUrl = "http://127.0.0.1:9088";

export default async({apiUrl, body, method = 'get', withAuthToken = false}) => {

  let requestUrl = baseUrl + apiUrl;

  const _method = method.toLowerCase()

  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  }

  if (withAuthToken) {
    headers['Authorization'] = auth();
    console.log(auth())
  }

  let settings = {
    method: _method,
    headers: headers
  }

  if (!['get', 'head'].includes(_method) && body) {
    settings['body'] = JSON.stringify(body)
  }

  if (_method === 'get') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(body).forEach(key => {
      dataStr += key + '=' + body[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      requestUrl = requestUrl + '?' + dataStr;
    }
  }
  // console.log(JSON.stringify(settings))
  // console.log(JSON.stringify(requestUrl))

  let result = {};
  const response = await fetch(requestUrl, settings);
  const responseJson = await response.json();
  result['text'] = response.statusText;
  result['status'] = response.status;
  result['data'] = responseJson;
  console.log(JSON.stringify(result))
  return result;

}

