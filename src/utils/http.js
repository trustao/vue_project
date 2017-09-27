/**
 * Created by 陶锐 on 2017/8/24.
 */
import axios from 'axios'
export default {
  get: (url, options) => {
    let abort = null
    const abortPromise = new Promise((resolve, reject) => {
      abort = () => {
        reject('http abort')
      }
    })
    const httpPromise = axios.get(url, options)
    const promise = Promise.race([abortPromise, httpPromise])
    promise.abort = abort
    promise.catch((d) => {
      if (d.response.status === 403) {
        window.$router.push('/login')
      }
    })
    return promise
  }
}
