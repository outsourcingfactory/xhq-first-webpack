const path = require('path');
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.config.js');

const merge=require('webpack-merge');
const proWebpackConfig=merge(baseWebpackConfig,{
    mode:"production",
    performance: {
        hints: 'warning',
        maxAssetSize: 250000, //单文件超过250k，命令行告警
        maxEntrypointSize: 250000, //首次加载文件总和超过250k，命令行告警
    },
    plugins: [
        //默认添加NODE_ENV为production
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })
    ],
    optimization: {
        minimize: true, //取代 new UglifyJsPlugin(/* ... */)
        providedExports: true,
        usedExports: true,
        //识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
        //依赖于optimization.providedExports和optimization.usedExports
        sideEffects: true,
        //取代 new webpack.optimize.ModuleConcatenationPlugin()
        concatenateModules: true,
        //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
        noEmitOnErrors: true
    }

});

module.exports=proWebpackConfig;
