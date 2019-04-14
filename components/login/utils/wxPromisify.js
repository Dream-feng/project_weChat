/**
 * 将小程序的API封装成支持Promise的API
 * @params fn {Function} 小程序原始API，如wx.login
 * @params params 小程序原始API所需参数
 */
export function wxPromisify(fn, params = {}) {
  // 立即执行函数
  return (function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }(params))
}

const primisic = function(fn) {
  return function(params={}) {
    new Promise((resolve, reject)=>{
      const arg = Object.assign({}, params, {
        success: (res)=>{
          resolve(res)
        },
        fail: (error)=>{
          reject(error)
        }
      })
      fn(arg)
    })
  }
}
