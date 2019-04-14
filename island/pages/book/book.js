import BookModel from '../../models/book'
import { randomStr } from '../../utils/common'
const bookModel = new BookModel()

Page({
  data: {
    book: [],
    searching: false,
    // search 组件所用数据
    hotWords: [],
    more: ''
  },

  // show / hide Search
  showSearch() {
    this.setData({
      searching: true
    })
  },
  hideSearch() {
    this.setData({
      searching: false
    })
  },

  _initHotList() {
    const book = bookModel.getHotList()
    // search 组件所用数据
    const hot = bookModel.getHot()

    Promise.all([book, hot]).then(res => {
      this.setData({
        book: res[0],
        hotWords: res[1].hot
      })
    })
  },

  onLoad: function(options) {
    this._initHotList()
  },

  onReachBottom(e) {
    // 传递给 search 组件
    this.setData({
      more: randomStr(16)
    })
  }
})
