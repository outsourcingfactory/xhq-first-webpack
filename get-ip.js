// build/get-ip.js

let os = require('os') // Node.js os 模块提供了一些基本的系统操作函数。
let IP = '' // 获取本机的IP
let interfaces = os.networkInterfaces() // 获得网络接口列表。
out:
    for (let i in interfaces) {
        for (let j in interfaces[i]) {
            let val = interfaces[i][j]
            if (val.family === 'IPv4' && val.address !== '127.0.0.1') {
                IP = val.address // 获取本机的IP
                break out
            }
        }
    }
module.exports = IP
