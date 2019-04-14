const touch = {} // 用于存储 touch 数据

Component({
  properties: {
    percent: {
      type: Number,
      value: 0,
      observer: '_observerPercent'
    },
    platState: {
      type: Boolean,
      value: false,
      observer: '_observerPlayState'
    }
  },

  data: {
    progressBtnImg: '/images/progress-btn.png', // 用于绑定
    progressBtnDynamicImg: '/images/progress-btn.gif',
    progressBtnStaticImg: '/images/progress-btn.png',
    styleTranslateLeft: '',
    styleProgressWidth: '',
    maxOffsetLeft: 0,
    timer: null // 性能优化，节流
  },

  methods: {
    progressTouchStart(e) {
      touch.initiated = true
      touch.startX = e.touches[0].clientX
      touch.left = touch.offsetWidth || 0 // 记录进度
    },

    progressTouchMove(e) {
      if (!touch.initiated) return // 未进入 progressTouchStart，结束操作
      // 性能优化，节流操作
      if (this.data.timer) clearInterval(this.data.timer)
      this.data.timer = setTimeout(() => {
        const deltaX = e.touches[0].pageX - touch.startX
        touch.offsetWidth = Math.min(
          this.data.maxOffsetLeft,
          Math.max(0, touch.left + deltaX)
        )
        this._offset()
      }, 1000 / 60)
    },

    progressTouchEnd(e) {
      touch.initiated = false
      this._triggerPercent()
      this._changeProgressBtnImg()
    },

    progressTouchcancel(e) {
      // 不操作
      // touch.offsetWidth = touch.left
      // this._offset()

      // 取消状态，也执行拖动操作
      touch.initiated = false
      this._triggerPercent()
      this._changeProgressBtnImg()
    },

    progressClick(e) {
      touch.offsetWidth = e.detail.x - e.target.offsetLeft
      this._offset()
      this._triggerPercent()
      this._changeProgressBtnImg()
    },

    _computeMaxOffsetLeft() {
      /*
       * 最大偏移量计算规则
       * progressBarWidth + hotDistrict
       */
      const query = wx.createSelectorQuery().in(this)
      query.select('.progress-bar').boundingClientRect()
      query.select('.progress-btn-wrapper').boundingClientRect()
      query.select('.progress-btn').boundingClientRect()
      query.exec(res => {
        let progressBarWidth = res[0].width
        let hotDistrict = (res[1].width - res[2].width) / 2
        let maxOffsetLeft = progressBarWidth + hotDistrict
        this.setData({
          maxOffsetLeft
        })
      })
    },

    _offset() {
      let offsetX = touch.offsetWidth
      let styleTranslateLeft = `transform:translateX(${offsetX}px);`
      let styleProgressWidth = `width: ${offsetX}px;`
      this.setData({
        styleTranslateLeft,
        styleProgressWidth
      })
    },

    _triggerPercent() {
      let percent = (touch.offsetWidth / this.data.maxOffsetLeft).toFixed(2) * 1
      this.triggerEvent('percentChange', percent)
    },

    _changeProgressBtnImg() {
      let progressBtnImg = this.data.progressBtnDynamicImg
      // 未播放
      if (
        touch.offsetWidth == 0 ||
        touch.offsetWidth == this.data.maxOffsetLeft
      ) {
        progressBtnImg = this.data.progressBtnStaticImg
      }
      this.setData({
        progressBtnImg
      })
    },

    _observerPercent(newPercent) {
      if (newPercent >= 0 && !touch.initiated) {
        touch.offsetWidth = newPercent * this.data.maxOffsetLeft
        this._offset()
        this._changeProgressBtnImg()
      }
    },

    _observerPlayState(newValue) {
      let progressBtnImg = newValue
        ? this.data.progressBtnStaticImg
        : this.data.progressBtnDynamicImg
      this.setData({
        progressBtnImg
      })
    }
  },

  ready() {
    this._computeMaxOffsetLeft()
  }
})
