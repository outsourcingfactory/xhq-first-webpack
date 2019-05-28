const path = require('path')
// const utils = require('../utils')
const fs = require('fs')

class ChannelAppPlugin {
    constructor(options) {
        this.appName = options.appName
        this.alias = options.alias
    }

    //complier 是webpack 在执行插件的时候 会调用 插件的apply 函数 并向里面注册一个 complier 通过这个compiler 可以获取webpack 打包的生命周期 在适当的时候做一些事
    apply(compiler) {
        // console.log('xhq run ',compiler.plugin);
        //开始打包
        compiler.plugin("compile",(params)=>{
          let nmf= params.normalModuleFactory;
          nmf.plugin('before-resolve',(module,callback)=>{
             // console.log(module);
             //在这里修改module 对象 然后 通过callBack 在return 出去
              return callback(null,module);
          });
        });

        // if (!this.appName || this.appName === "undefined") return;
        //
        // let fileList = [];
        //
        // utils.readDirRecursivelySync(path.join(__dirname, `../../${this.appName}`), fileList)
        // let appName = this.appName
        // let alias = this.alias;
        //
        //
        // compiler.plugin("compile", (params) => {
        //
        //     let nmf = params.normalModuleFactory
        //
        //     nmf.plugin("before-resolve", (module, callback) => {
        //         fileList.forEach(file => {
        //             if (module.request.indexOf(file) >= 0) {
        //                 for (let index = 0; index < alias.length; index++) {
        //                     const alia = alias[index];
        //                     if (module.request.indexOf(alia) === 0) {
        //                         module.request = path.join(__dirname, '../../' + appName, module.request)
        //                         console.log(module.request);
        //                     } else if (module.request.indexOf('.') === 0) {
        //                         module.context = module.context.replace('src', appName)
        //                         module.request = path.join(module.context, module.request)
        //                         console.log(module.request);
        //                     }
        //                 }
        //             }
        //         });
        //
        //         return callback(null, module);
        //     })
        // })
        //
        // compiler.plugin('compilation', function (compilation) {
        //     compilation.plugin('build-module', function (module) {
        //         if (module.resource &&
        //             module.resource.indexOf(
        //                 path.join(__dirname, '../../src')
        //             ) >= 0) {
        //
        //             fileList.forEach(file => {
        //                 let channelResource = module.resource.replace('src', appName)
        //                 if (module.resource.indexOf(file) >= 0 && fs.existsSync(channelResource)) {
        //                     module.resource = channelResource;
        //                     console.log(module.resource)
        //                 }
        //             });
        //         }
        //     })
        // });
    }
}

module.exports = ChannelAppPlugin;
