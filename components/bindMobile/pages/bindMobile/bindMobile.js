import {
  BindMobileModel
} from '../../models/bindMobile.js'

const bindMobileModel = new BindMobileModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    code: '',
    showGetCode: true,
    awaitTime: 60
  },

  onBlurPhoneNum(e) { // 获取手机号码
    const phoneNum = e.detail.value || e.detail.text
    if (!phoneNum) {
      return
    }
    this.setData({
      phoneNum
    })
  },

  onBlurCode(e) { // 获取用户输入的验证码
    const code = e.detail.value || e.detail.text
    if (!code) return
    this.setData({
      code
    })
  },

  getcode(e) {
    const phoneNum = this.data.phoneNum

    if (bindMobileModel.checkPhoneNum(phoneNum)) {
      // http 请求
      // http 请求成功，倒计时开始
      this._awaitTimer()
    }
  },

  finishBtn() {
    const phoneNum = this.data.phoneNum
    const code = this.data.code

    if (!bindMobileModel.checkPhoneNum(phoneNum)) {  // 再次检查手机号码
      return
    }
    if (bindMobileModel.checkCode(code)) {
      // http 请求
      // default 0000
      // 请求完成，返回上一页
      // wx.navigateBack({
      //   delta: 1
      // })
    }
  },

  _awaitTimer() {
    this.setData({
      showGetCode: false
    })
    const initAwaitTime = this.data.awaitTime
    let timer = setInterval(() => {
      let awaitTime = this.data.awaitTime
      // 结束
      if (awaitTime == 1) {
        clearInterval(timer)
        this.setData({
          showGetCode: true,
          awaitTime: initAwaitTime
        })
        return
      }
      // 数字递减
      awaitTime--
      this.setData({
        awaitTime
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  }
})