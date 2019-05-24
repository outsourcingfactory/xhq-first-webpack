const path = require('path');
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.config.js');

const merge=require('webpack-merge');
const proWebpackConfig=merge(baseWebpackConfig,{
    mode:"production",
});

module.exports=proWebpackConfig;
