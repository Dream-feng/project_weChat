import { HTTP } from '../utils/http'

export default class LikeModel extends HTTP {
  like(param) {
    let url = param.behavior === 'like' ? 'like' : 'like/cancel'
    return this.request({
      url,
      method: 'POST',
      data: {
        art_id: param.artID,
        type: param.category
      }
    })
  }

  getClassicLikeStatus(artID, category) {
    return this.request({
      url: `classic/${category}/${artID}/favor`
    })
  }
}
