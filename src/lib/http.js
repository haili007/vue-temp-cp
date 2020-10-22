/* eslint-disable */
import axios from 'axios'
const parseParam = function(param) {
  let paramStr = ''
  if (typeof param == 'object') {
    for (let key in param) {
      let values = ''
      try {
        values = encodeURI(param[key])
      } catch (error) {
        values = param[key]
      }
      paramStr += '&' + key + '=' + values
    }
  }
  return paramStr.substr(1)
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded;charset=UTF-8'
export default {
  request(config) {
    return new Promise((resolve, reject) => {
      axios
        .request(config)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          resolve({ code: -999, msg: '系统异常', e: error })
        })
    })
  },
  get(url, params = {}, headers = {}, isjson = false) {
    params = parseParam(params)
    headers = Object.assign(
      {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      headers
    )
    return new Promise((resolve, reject) => {
      axios({
        url: url + '?' + params,
        method: 'get',
        data: params,
        headers: headers,
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          resolve({ code: -999, msg: '系统异常', e: error })
        })
    })
  },
  post(url, params = {}, headers = {}, isjson = false) {
    return new Promise((resolve, reject) => {
      ;(headers = Object.assign(
        {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        headers
      )),
        axios({
          url: url,
          method: 'post',
          transformRequest: [
            function(data) {
              if (isjson) {
                data = JSON.stringify(data)
              } else {
                data = parseParam(data)
              }
              return data
            },
          ],
          data: params,
          headers: headers,
        })
          .then(res => {
            resolve(res.data)
          })
          .catch(error => {
            resolve({ code: -999, msg: '系统异常', e: error })
          })
    })
  },
}