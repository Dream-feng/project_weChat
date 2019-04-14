import BookModel from '../../models/book'
import LikeModel from '../../models/like'
const bookModel = new BookModel()
const likeModel = new LikeModel()

const BOOK_TYPE = 400

Page({
  data: {
    book: null,
    comments: [],
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  onLike(e) {
    const behavior = e.detail
    likeModel.like({
      behavior,
      artID: this.data.book.id,
      category: BOOK_TYPE
    })
  },

  // 短评显示、隐藏
  onFakePost() {
    this.setData({
      posting: true
    })
  },
  onCancel() {
    this.setData({
      posting: false
    })
  },
  // 评论
  onPost(e) {
    // 获取 tag input 内容
    const comment = e.detail.text || e.detail.value
    if (!comment) {
      return
    }
    // 长度检测
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    // 提交评论
    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '+ 1',
        icon: 'none'
      })
      // 添加评论
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      // 更新数据
      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  },

  _initData(id) {
    wx.showLoading() // 用户体验
    const detail = bookModel.getDetail(id)
    const comments = bookModel.getComments(id)
    const likeStatus = bookModel.getLikeStatus(id)
    Promise.all([detail, comments, likeStatus]).then(res => {
      wx.hideLoading()
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
    })
  },

  onLoad: function(options) {
    const bid = options.bid
    this._initData(bid)
  }
})
