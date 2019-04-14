export class BindMobileModel {

  checkPhoneNum(num) {
    const regIsNum = /^\d+$/
    const regLength = /^\d{11}$/
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/ // 检查手机号码是否正确

    if (!num) {
      this.showToast('请输入手机号码')
      return
    }
    if (!regIsNum.test(num)) {
      this.showToast('请输入数字')
      return
    }
    if (!regLength.test(num)) {
      this.showToast('手机号码不足11位')
      return
    }
    if (!reg.test(num)) {
      this.showToast('手机号码输入错误')
      return
    }

    return true
  }

  checkCode(num) {
    // 后端固定验证码为4位
    const regLength = /^\d{4}$/
    const regIsNum = /^[0-9]+\d?[0-9]*$/

    if (!num) {
      this.showToast('请输入验证码')
      return
    }
    if (!regLength.test(num) || !regIsNum.test(num)) {
      this.showToast('验证码错误')
      return
    }
    
    return true
  }

  showToast(title) {
    wx.showToast({
      title,
      icon: 'none',
      duration: 2000,
    })
  }

}