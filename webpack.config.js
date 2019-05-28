const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');//每次打包，都会生成项目的静态资源，随着某些文件的增删，我们的 dist 目录下可能产生一些不再使用的静态资源，webpack并不会自动判断哪些是需要的资源，为了不让这些旧文件也部署到生产环境上占用空间，所以在 webpack 打包前最好能清理 dist 目录
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//webpack 并不会主动将你的css代码提取到一个文件，过去我们使用 extract-text-webpack-plugin，在webpack4中我们使用mini-css-extract-plugin来解决这个问题。
const ChannelAppPlugin=require('./plugin/ChannelAppPlugin.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');//用来拷贝文件目录到dist文件里
const webpack = require('webpack'); //用于访问内置插件
console.log('xhq path ==>',process.argv);
let bulidtype=process.argv.slice(2)[0]; //拿到当前的生产环境 从package.json 读取
let devMode=true;
function resolve(dir){
	return path.join(__dirname,dir)
}

const config = {
	entry: [
		"babel-polyfill",
		path.join(__dirname, './src/index.js')
	],  //入口文件
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'static/js/[name].[hash:7].js',   //1.hash 是工程级别的 一旦修改了任何一个文件 整个项目的文件缓存都将失效了2.chunkhash 根据不同的入口文件进行依赖解析，构建对应的chunk,生成对应的hash值，只要
		chunkFilename:'static/js/[id].[hash:7].js', //我们不改动公共代码库，就可以保证其哈希值不会受影响，3.counthash 针对文件的内容级别 比如test.js test.css 如果使用chunkhash 修改一个文件，2个文件的哈希值都会变
		                                                 //chunkname我的理解是未被列在entry中，却又需要被打包出来的文件命名配置。什么场景需要呢？我们项目就遇到过，在按需加载（异步）模块的时候，这样的文件是没有被列在entry中的，如使用CommonJS的方式异步加载模块：
	},
    resolve: {
	  extensions:['.js'],
	  alias:{
        '@':resolve('src'),
	    'css':resolve('src/css')
	  }
    },

    module:{
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"  //用来转换es6语法
				}
			},
			{
				test: /\.(css|scss)$/,
				use: [
					(process.env.NODE_ENV=='development') ? 'style-loader' : MiniCssExtractPlugin.loader,
					// MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader'   //识别css  生产环境压缩提取css
				]
			},
			{
				test: /\.html$/,
				use: [{
					loader: "html-loader",  //html 加载器
					options: {
						minimize: true
					}
				}]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',   //静态资源处理
						options: {}
					}
				]
			},
			{
                test: /\.(png|jpg|gif|svg|bmp|jpeg)$/,
                use: 'url-loader'  //因为 处理 css backgroun('../') url的只依赖于整个 所以不能写成数组的形式
			}
		]
	},
	plugins:[
		new MiniCssExtractPlugin({
			filname:"[name].[chunkhash:8].css",
			chunkFilename: "[id].[cbunkhash:8].css"   //提取css
		}),//这里还是要提醒一下，如果只有一个入口filename写不写硬编码都没关系，因为就只有一个入口，但如果有多个入口，那就不能使用硬编码了，不然后面入口生成的css文件会覆盖前面生成的。这是我之前在extract-text-webpack-plugin踩过的坑。
		new CleanWebpackPlugin(),  //打包清理dist 文件
		new HtmlWebpackPlugin({  //该插件功能是打包js入口文件时，以该html作为模板，将打包后的js插入该模板，将html文件输出到输出目录中
			title:"webpack app",
			template: "index.html",
			filename: "index.html",   //html 压缩
			inject: true,
			hash:true,
			chunksSortMode: "none" //这里有个坑 最好把chunkSortMode 这个现象设为none
		}),
		new ChannelAppPlugin({
			appName:'xhq',
			alias:['xhq']
		}),   //测试用的 可以删掉
		new CopyWebpackPlugin([{
			from:path.resolve(__dirname,'static'),  //定义要拷贝的源目录
			to:path.resolve(__dirname,'dist/static'),   //定义要拷贝到的目标目录
			ignore:['.*'],  //忽略拷贝指定的文件 可以用模糊匹配
			// toType:'dir', //可选 file dir  默认是文件 可以去掉该选项
			// force:false, //强制覆盖先前的插件   可选 默认为false 可以去掉该选项
			// context:'base',  //可选 默认base context可用specific context 可以去掉该选项
			// flatten:false, //只拷贝文件不管文件夹      默认是false 可以去掉该选项
		}])
	]
};
module.exports=config;
