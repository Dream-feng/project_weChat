export const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    loading: false,
    noneResult: false
  },

  methods: {
    getCurrentStart() {
      return this.data.dataArray.length
    },

    setTotal(total) {
      this.data.total = total
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },

    setMoreData(arr) {
      const dataArray = this.data.dataArray.concat(arr)
      this.setData({
        dataArray
      })
    },

    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      }
      return true
    },

    initialize() {
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false
      })
      this.data.total = null
    },

    // 锁
    isLocked() {
      return this.data.loading ? true : false
    },

    locked() {
      this.setData({
        loading: true
      })
    },

    unLocked() {
      this.setData({
        loading: false
      })
    }
  }
})
