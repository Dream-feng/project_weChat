import { config } from "../config"

class HTTP {
  request({ url, data = {}, method = "GET" }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data = {}, method = "GET") {
    // url, data, method
    method = method.toUpperCase()
    let contentType = ''
    if (method === "POST" || method === "PUT") {
      contentType = "application/x-www-form-urlencoded"
    } else {
      contentType = "application/json"
    }

    wx.request({
      url: config.app_base_url + url,
      method,
      data: data,
      header: {
        'content-type': contentType,
        'token': wx.getStorageSync(config.tokenStorageName)
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject(res)
          // this._show_error()
        }
      },
      fail: (err) => {
        reject()
        // this._show_error()
      }
    })
  }

  _show_error() {
    wx.showToast({
      title: '出现了一个错误',
      icon: 'none',
      duration: 2000
    })
  }
}

export { HTTP }