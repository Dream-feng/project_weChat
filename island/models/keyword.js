import { HTTP } from '../utils/http'

// 缓存 query
const QUERT_KEY = '__query__'
const QUERT_LENGTH = 10

export default class KeywordModel extends HTTP {
  addHistory(val) {
    let words = this.getHistory()
    const hasVal = words.includes(val)
    if (!hasVal) {
      // 不存在
      words.length >= QUERT_LENGTH && words.pop()
    } else {
      // 存在，找到 val 位置后移除，保证最近搜索历史在最前面
      const index = words.findIndex(item => {
        return val === item
      })
      words.splice(index, 1)
    }
    words.unshift(val)
    wx.setStorageSync(QUERT_KEY, words)
  }

  getHistory() {
    return wx.getStorageSync(QUERT_KEY) || []
  }
}
