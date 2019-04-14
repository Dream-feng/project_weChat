import KeywordModel from '../../models/keyword'
import BookModel from '../../models/book'
import { paginationBev } from '../behaviors/pagination'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [paginationBev],

  properties: {
    hotWords: Array,
    more: String
  },

  data: {
    query: '',
    historyWords: [],
    searching: false,
    loadingCenter: false
  },

  methods: {
    onCancel() {
      this.initialize()
      this.triggerEvent('cancel')
    },

    // input 框事件
    onDelete() {
      this.initialize()
      this._closeResult()
    },

    onConfirm(e) {
      this._showResult()
      this._showLoadingCenter()
      const query = e.detail.value || e.detail.text
      this.setData({
        query
      })
      bookModel.search(0, query).then(res => {
        this._hideLoadingCenter()
        this.setMoreData(res.books)
        this.setTotal(res.total)
        // 有搜索内容才添加 history
        keywordModel.addHistory(query)
      })
    },

    // 可读性封装函数
    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        query: '',
        searching: false
      })
    },

    // 初次加载动画
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _initHistoryWords() {
      // 历史
      const historyWords = keywordModel.getHistory()
      this.setData({
        historyWords
      })
    }
  },

  observers: {
    more(newVal) {
      if (!newVal || !this.data.query) {
        return
      }
      // 正在请求
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        // 小程序不支持 Promise.finally()
        bookModel.search(this.getCurrentStart(), this.data.query).then(
          res => {
            this.unLocked()
            this.setMoreData(res.books)
          },
          () => {
            this.unLocked()
          }
        )
      }
    }
  },

  attached() {
    this._initHistoryWords()
  }
})
