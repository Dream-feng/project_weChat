import {
  LoginModel
} from '../../utils/login.js'
import {
  wxPromisify
} from '../../utils/wxPromisify.js'

const loginModel = new LoginModel()

Page({

  data: {
    // 默认打开授权页面
    checkSession: false,
  },

  onGotUserInfo(e) {
    let credentials = e.detail
    console.log(credentials)
    loginModel.getUserDecryption(credentials).then((res)=>{
      // 用户授权成功
      this._changeSession()
    })
  },

  onLoad: function (options) {
    loginModel.checkUserInfo().then((res)=>{
      // 成功获取用户信息
      this._changeSession()
    },(err)=>{
      // 未授权
    })
  },

  _changeSession() {
    this.setData({
      checkSession: !this.data.checkSession
    })
  }

})