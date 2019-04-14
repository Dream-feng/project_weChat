import { HTTP } from '../utils/http'

export default class MyModel extends HTTP {
  getMyFavor(success) {
    return this.request({
      url: 'classic/favor'
    })
  }

  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }
}
