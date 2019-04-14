Component({
  options: {
    multipleSlots: true
  },

  properties: {
    openType: String
  },

  data: {},

  methods: {
    onGetUserInfo(e) {
      e.detail.userInfo && this.triggerEvent('getuserinfo', e.detail)
    }
  }
})
