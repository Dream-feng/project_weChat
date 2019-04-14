Component({
  properties: {
    like: Boolean,
    count: Number,
    readOnly: Boolean
  },

  data: {
    yes_url: 'images/like.png',
    no_url: 'images/like@dis.png'
  },

  methods: {
    onLike() {
      // 只读
      if (this.properties.readOnly) {
        return
      }
      let like = !this.properties.like
      let count = this.properties.count
      like ? count++ : count--
      this.setData({
        like,
        count
      })
      // 激活
      let behavior = like ? 'like' : 'cancel'
      this.triggerEvent('like', behavior)
    }
  }
})
