const formatDate = {
  "周一到周五": 1,
  "周六、周日": 2
}

export class ParentsModel {
  
  getPlayMinutes(date) {
    if (!date) {
      let type = 1
    } else {
      let type = this._getType(date)
    }

    // http(type)
  }

  setPlayMinutes(date, time) {
    // http(this._getType(date), time)
  }

  _getType(date) {
    return formatDate[date]
  }

}