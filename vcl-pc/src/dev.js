// ----------- 以下默认
//  nginx 和 gzip
//  gzip 是 因为cordova app 不支持gzip
// ------------
// 服务主要地址
// 启敏
// let host = 'http://192.168.10.249:8089'
var localStorage = require('localStorage')
let host = 'http://mitigenomics.leoatchina.com:18090'
if (localStorage.getItem('api') && localStorage.getItem('port')) {
  let api = localStorage.getItem('api')
  let port = localStorage.getItem('port')
  host = api + ':' + port
}
let nginx = false
nginx = true
// 是APP是 gzip 选用 false
let gzip = true
// gzip = false
// ----------------------------------------------------
let proxyTable = {
  '/api': {
    target: host,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/'
    }
  }
}

let proxyTableApi = {}
// Is your service nginx  和 npm run dev 都是代理方式
// 封装一个对象，如 {'api': '/api’}
for (let i in proxyTable) {
  proxyTableApi[i.replace(/\//, '')] = i
}
// build 后 无代理 放到指定服务目录下 无代理 所以不能用 /hot...
if (process.env.NODE_ENV === 'production') {
  if (gzip) {
    if (!nginx) {
      for (let i in proxyTable) {
        proxyTableApi[i.replace(/\//, '')] = ''
      }
    }
  } else {
    for (let i in proxyTable) {
      proxyTableApi[i.replace(/\//, '')] = proxyTable[i].target
    }
  }
}
console.log(proxyTableApi, process.env.NODE_ENV)
module.exports = {
  proxyTable,
  proxyTableApi,
  gzip
}
