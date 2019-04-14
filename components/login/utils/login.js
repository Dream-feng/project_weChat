import { config } from "../config"
import { HTTP } from '../utils/http.js'
import { wxPromisify } from '../utils/wxPromisify.js'

const TOKEN_KEY = '__token__'

export class LoginModel extends HTTP {

  // 不建议调用 wx.checkSession()，耗时长 300ms+
  checkSession() {
    return wxPromisify(wx.checkSession).then((res) => {
      return this.checkUserInfo()
    }, (err) => { // 用户信息过期
      return this._getToken()
    })
  }

  // 检查用户信息
  checkUserInfo() {
    let token = wx.getStorageSync(TOKEN_KEY)
    if (!token) {
      return this._getToken()
    }
    return this._getLoginStatus()
  }

  // 用户授权，后台解密
  getUserDecryption(param) {
    return this.request({
      url: 'weixin/decryption',
      method: 'post',
      data: {
        encryptedData: param.encryptedData,
        iv: param.iv,
        rawData: param.rawData,
        signature: param.signature,
      }
    })
  }

  // _getToken() {
  //   // 三次 return 返回 _getLoginStatus 的状态
  //   return wxPromisify(wx.login).then(res => {
  //     let code = res.code
  //     return this._getUserLogin(code).then(res => {
  //       let token = res.data
  //       wx.setStorageSync(TOKEN_KEY, token)
  //       // 获取到 token，拿取用户信息
  //       return this._getLoginStatus()
  //     })
  //   })
  // }
  _getToken() {
    // 三次 return 返回 _getLoginStatus 的状态
    return wxPromisify(wx.login)
      .then(res => {
        let code = res.code
        return this._getUserLogin(code)
      })
      .then(res => {
        let token = res.data
        wx.setStorageSync(config.tokenStorageName, token)
        // 获取到 token，拿取用户信息
        return this._getLoginStatus()
      })
  }

  // _getLoginStatus() {
  //   return new Promise((resolve, reject) => {
  //     this._getUserInfo().then(res => {
  //       console.log(res)
  //       if (res.status == 3002) { // 用户未授权拿取信息，请授权
  //         reject(res)
  //       } else if (res.status == 40001) { // token 失效
  //         // 通过 getToken 三次 return 改变 promise 状态
  //         this._getToken().then(res => {
  //           resolve(res)
  //         }, err => {
  //           reject(res)
  //         })
  //       } else { // 有数据，进入主页
  //         resolve(res)
  //       }
  //     })
  //   })
  // }
  _getLoginStatus() {
    return new Promise((resolve, reject) => {
      this._getUserInfo().then(res => {
        console.log(res)
        if (res.status == 3002) {
          // 用户未授权拿取信息，请授权
          reject(res)
        } else if (res.status == 40001) {
          // token 失效
          // 通过 getToken 三次 return 改变 promise 状态
          return this._getToken()
        } else {
          // 有数据，进入主页
          resolve(res)
        }
      }).then(
        res => {
          resolve(res)
        },
        err => {
          reject(res)
        }
      )
    })
  }

  _getUserLogin(code) {
    return this.request({
      url: 'weixin',
      data: {
        code
      }
    })
  }

  _getUserInfo() {
    return this.request({
      url: 'weixin/info'
    })
  }

}