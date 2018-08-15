// ----------- 以下默认
//  nginx 和 gzip
//  gzip 是 因为cordova app 不支持gzip
// ------------
// 服务主要地址
let host = 'http://192.168.10.196:8089'
// Is your service nginx  和 npm run dev 都是代理方式
let nginx = false
// nginx = true
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
  },
  // 没有代理服务器环境 不可用, 用上nginx代理 可用
  '/hot': {
    target: 'http://echarts.baidu.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/hot': '/'
    }
  }
}
// nginx 相对的配置

// location /api {
//   proxy_pass http://www.udao56.com/thinkphp5/index.php/tms;
// }
// location /hot {
//     proxy_pass http://echarts.baidu.com/;
// }

let proxyTableApi = {}
// Is your service nginx  和 npm run dev 都是代理方式
// 封装一个对象，如 {'api': '/api’}
for (let i in proxyTable) {
  proxyTableApi[i.replace(/\//, '')] = i
}
// build 后 无代理 放到指定服务目录下 无代理 所以不能用 /hot...
if (process.env.NODE_ENV !== 'development') {
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
console.log(proxyTableApi)
module.exports = {
  proxyTable,
  proxyTableApi,
  gzip
}
