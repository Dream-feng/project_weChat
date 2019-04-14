// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: -1
    }
  },

  data: {
    year: 0,
    month: '',
    _index: '',
    months: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ]
  },

  methods: {
    _getDate() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()
      this.setData({
        year,
        month: this.data.months[month]
      })
    }
  },

  // wechat: ^2.6.1
  observers: {
    index(newVal) {
      if (!newVal) {
        return
      }
      let _index = newVal < 10 ? '0' + newVal : newVal
      this.setData({
        _index
      })
    }
  },

  attached() {
    this._getDate()
  }
})
