import {ParentsModel} from "../../models/parentsMode.js"

const parentsModel = new ParentsModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateWeekend: '周六、周日',
    initWorkdayArea: 4,
    initWeekendArea: 4
  },

  setTimeWorkday(e) {
    parentsModel.setPlayMinutes(e.detail.date, e.detail.time)
  },

  setTimeWeekend(e) {
    parentsModel.setPlayMinutes(e.detail.date, e.detail.time)
  },

  setPassWord() {
  },

  _initClawPosition() {
    let initWorkdayArea = parentsModel.getPlayMinutes() | this.data.initWorkdayArea
    let initWeekendArea = parentsModel.getPlayMinutes(this.data.dateWeekend) | this.data.initWeekendArea
    this.setData({
      initWorkdayArea,
      initWeekendArea
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._initClawPosition()
  }
})