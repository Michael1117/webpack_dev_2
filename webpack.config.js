let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')


// 1) cleanWebpackPlugin
// 2) copyWebpackPlugin
// 3) bannerPlugin  内置
module.exports = {
    // 多入口文件
    mode: 'development',
    entry: {
        home: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    // 1) devtool: 'source-map' 源码映射   会单独生成一个source map 文件 出错了会标识 当前的列和行 大而全
    // devtool: 'source-map',  // 增加映射文件  可以帮我们调试 源代码

    // 2) devtool: 'eval-source-map', 不会产生单独的文件  但是可以显示行和列
    // devtool: 'eval-source-map',

    // 3) 不会产生列 但是是一个单独的映射文件  
    // devtool: 'cheap-module-source-map', // 产生后你可以保留起来

    // 4) 不会产生文件 集成在打包后的文件中 不会产生列
    //devtool: 'cheap-module-eval-source-map',
    watch: true,
    watchOptions: { // 监控的选项
        poll: 1000,   //每秒 问我 1000次
        aggregateTimeout: 500, // 防抖 我一直输入代码
        ignored: /node_modules/   // 不需要进行监控哪个文件
    },
    output: {
        // [name] home, other
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'home.html'
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['./dist']
        }),  //把dist  先删除  后打包
        new CopyWebpackPlugin([
            {from: './doc', to: './'}  // 拷贝插件
        ]),
        new webpack.BannerPlugin('make 2019 by Michael')
    ]
}