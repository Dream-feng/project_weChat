import { HTTP } from '../utils/http'

const LATEST_KEY = '__latest__'

export default class ClassicModel extends HTTP {
  getLatest() {
    return this.request({
      url: 'classic/latest'
    })
  }

  getClassic(index, nextOrPrevious) {
    let key =
      nextOrPrevious == 'next' ? this.getKey(index + 1) : this.getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      return this.request({
        url: `classic/${index}/${nextOrPrevious}`
      })
    } else {
      // 添加一个 key 标明缓存
      let response = Object.assign({}, classic, { isCache: true })
      return classic && Promise.resolve(response)
    }
  }

  // 缓存期刊
  getKey(index) {
    let key = `classic-${index}`
    return key
  }

  // 判断是否是第一个或者最后一个
  isFirst(index) {
    return index == 1 ? true : false
  }
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return index == latestIndex ? true : false
  }
  setLatestIndex(index) {
    wx.setStorageSync(LATEST_KEY, index)
  }
  _getLatestIndex() {
    return wx.getStorageSync(LATEST_KEY)
  }
}
