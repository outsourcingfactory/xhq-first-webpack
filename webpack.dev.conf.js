const path = require('path');
const merge=require('webpack-merge');
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.config.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');



const devWebpackConfig=merge(baseWebpackConfig,{
    mode:"development",
    devServer:{     //在development 环境使用
        clientLogLevel: 'warning',
        contentBase: path.join(__dirname, "dist"),
        publicPath:'/',
        compress: true,  //一切服务启用gzip 压缩
        hot: true,
        inline:false,  //这个是开启浏览器的显示  默认为true  不开启
        host:'localhost',
        port:9000,
        open:true, //是否自动打开浏览器
        overlay: {
            errors: true // 错误提示
        },
        proxy:{   //代理

        },
        progress:true, //将进入输出到控制台
        historyApiFallback: true,  //允许热更新时 解决history路径的刷新失败
        quiet:true  //启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    },
    devtool: 'inline-source-map',  //在没有devtool配置的情况下 npm run dev，会发现错误提示的行数并不准确
    module:{

    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),



    ]
})

//这里是把当前的host port 打印出来
devWebpackConfig.plugins.push( new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
        messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${devWebpackConfig.devServer.port}`],
    },
    onErrors: null
}));

module.exports=devWebpackConfig;
