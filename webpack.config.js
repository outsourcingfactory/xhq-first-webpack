const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');//每次打包，都会生成项目的静态资源，随着某些文件的增删，我们的 dist 目录下可能产生一些不再使用的静态资源，webpack并不会自动判断哪些是需要的资源，为了不让这些旧文件也部署到生产环境上占用空间，所以在 webpack 打包前最好能清理 dist 目录
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//webpack 并不会主动将你的css代码提取到一个文件，过去我们使用 extract-text-webpack-plugin，在webpack4中我们使用mini-css-extract-plugin来解决这个问题。
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
		filename:'[name].[hash].js'
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
			filname:"[name].[hash:8].css",
			chunkFilename: "[id].[hash:8].css"   //提取css
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
	]
};
module.exports=config;
