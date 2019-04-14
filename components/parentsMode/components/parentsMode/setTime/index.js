Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: {
      type: String,
      value: "周一到周五"
    },

    // scrollbar 可以传递的参数
    timeList: {
      type: Array,
      value: ['15', '30', '45', '60', '不限时']
    },
    initArea: {
      type: Number,
      value: 4
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clawTouchEnd(e) {
      this.triggerEvent('clawTouchEnd', {
        time: e.detail,
        date: this.properties.date
      }, {})
    }
  }
})
