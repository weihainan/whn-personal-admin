import fetch from 'isomorphic-fetch'

const baseUrl = "http://127.0.0.1:9088";

export default async({apiUrl, body, method = 'get', withAuthToken = ''}) => {

  const requestUrl = baseUrl + apiUrl;

  const _method = method.toLowerCase()

  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  }

  if (withAuthToken) {
    headers['Authorization'] = withAuthToken;
  }

  let settings = {
    method: _method,
    headers: headers
  }

  if (!['get', 'head'].includes(_method) && body) {
    settings['body'] = JSON.stringify(body)
  }

  // return fetch(requestUrl, settings).then(response => {
  //   let json = response.json()
  //   console.log(JSON.stringify(json))
  //   return json.then(json => {
  //     return {json, response}
  //   }).then(({json, response}) => {
  //     if (!response.ok) {
  //       return Promise.reject(json)
  //     }
  //     return{json, response}
  //   }).catch(e => {
  //     if (response.ok) {
  //       return {}
  //     } else {
  //       return Promise.reject(e)
  //     }
  //   })
  // })

  try {
    const response = await fetch(requestUrl, settings);
    const responseJson = await response.json();
    console.log(JSON.stringify(responseJson))
    return responseJson
  } catch (error) {
    throw new Error(error)
  }
}

