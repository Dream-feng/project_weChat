Component({
  /**
   * 组件的属性列表
   */
  properties: {
    timeList: Array, // ['15', '30', '45', '60', '不限时']
    initArea: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectTime: '',
    touch: {  // 鼠标偏移量容器
      offsetWidth: 0
    },
    maxOffsetLeft: 0,
    clawStyle: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clcikCircle(e) {
      // 存在热区域的偏移量，忽略不计
      let offsetX = e.detail.x
      this._diffArea(offsetX)
      this._offset()
    },

    clawTouchStart(e) {
      this.data.touch.startX = e.touches[0].clientX
      this.data.touch.left = this.data.touch.offsetWidth
    },

    clawTouchMove(e) {
      this.data.touch.deltaX = e.touches[0].clientX - this.data.touch.startX
      this.data.touch.offsetWidth = this.data.touch.left + this.data.touch.deltaX
      // limit
      this.data.touch.offsetWidth = Math.min(this.data.maxOffsetLeft, Math.max(0, this.data.touch.offsetWidth))
      this._offset()
    },

    clawTouchEnd(e) {
      this._diffArea(this.data.touch.offsetWidth)
      this._offset()
    },

    clawTouchCancel(e) {
    },

    initialize() {
      // 最大偏移量计算规则 computeMaxOffsetLeft
      // iPhone 6 : 318px
      // circle-list的宽度 - circle的热选区 - ((claw的宽度 - circle的宽度) / 2)

      // css 的值
      const circleWrapW = 34
      const circleWrapPadding = 8
      const circleW = 18

      // 创建节点
      const query = wx.createSelectorQuery().in(this)
      // 获取 DOM
      query.select('.circle-list').boundingClientRect()
      query.select('.circle-wrap').boundingClientRect()
      query.select('.claw-wrap').boundingClientRect()
      // 返回信息
      query.exec((res) => {
        let circleListWidth = res[0].width
        let circleReallyPadding = res[1].width * circleWrapPadding / circleWrapW
        let clawHalfWidth = (res[2].width - res[1].width * circleW / circleWrapW) / 2
        let maxOffsetLeft = circleListWidth - circleReallyPadding * 2 - clawHalfWidth
        this.setData({
          maxOffsetLeft
        })

        // 初始化 clow 的位置
        this._initializeClawPosition(this.properties.initArea)
      })
    },

    _offset(offsetWidth) {
      let offsetX = offsetWidth | this.data.touch.offsetWidth
      let style = `transform:translate3d(${offsetX}px, -60%,0);`
      this.setData({
        clawStyle: style
      })
    },

    _diffArea(offsetWidth, initArea) {
      // area
      // 0, 1, 2, 3...

      let spaceNum = this.properties.timeList.length - 1
      let space = this.data.maxOffsetLeft / spaceNum

      if (initArea) {  // 约束初始化区域
        initArea = initArea > spaceNum ? spaceNum : initArea
      }

      let area = initArea | Math.round(offsetWidth / space)
      this.data.touch.offsetWidth = area * space
      this.setData({
        selectTime: this.properties.timeList[area]
      })
      // 派发事件
      this.triggerEvent('clawTouchEnd', this.data.selectTime, {})
    },

    _initializeClawPosition(area) {
      this._diffArea(0, area)
      this._offset()
    }
  },

  ready() {
    this.initialize()
  }
})
