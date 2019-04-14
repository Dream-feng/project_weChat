import ClassicModel from '../../models/classic'
import LikeModel from '../../models/like'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false
  },

  onLike(e) {
    const behavior = e.detail
    likeModel.like({
      behavior,
      artID: this.data.classic.id,
      category: this.data.classic.type
    })
  },

  updateClassic(e) {
    const nextOrPrevious = e.type === 'left' ? 'next' : 'previous'
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious).then(res => {
      // 发送请求更新 likeStatus
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
      // 缓存期刊
      !res.isCache && wx.setStorageSync(classicModel.getKey(res.index), res)
    })
  },

  _getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus(artID, category).then(res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  _initClassic() {
    classicModel.getLatest().then(res => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
      // 缓存最新期刊的 index
      classicModel.setLatestIndex(res.index)
      // 缓存期刊
      wx.setStorageSync(classicModel.getKey(res.index), res)
    })
  },

  onLoad: function(options) {
    this._initClassic()
  }
})
