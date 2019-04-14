import MyModel from '../../models/my'
const myModel = new MyModel()

Page({
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  getMyFavor() {
    myModel.getMyFavor().then(res => {
      this.setData({
        classics: res
      })
    })
  },

  getMyBookCount() {
    myModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },

  userAuthorized() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 用户授权
          wx.getUserInfo({
            success: res => {
              this.setData({
                authorized: true,
                userInfo: res.userInfo
              })
            }
          })
        } else {
          // 用户未授权
        }
      }
    })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    this.setData({
      authorized: true,
      userInfo
    })
  },

  onLoad: function(options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  }
})
