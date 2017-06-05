let webpack = require('webpack'),
    config = require('./webpack.base.conf'),
    commonPath = require('./commonPath'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');


config.output.filename = '[name].[chunkhash:10].js';
config.output.chunkFilename = '[name].[chunkhash:10].js';

config.devtool = commonPath.SOURCE_MAP ? 'source-map' : false;

// 生产环境下分离出 CSS 文件
config.module.rules.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
        use: [{
            loader: "css-loader?importLoaders=1"
        },{
            loader: "postcss-loader"
        }],
        fallback: "style-loader"
    })
}, {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
        use: [{
            loader: "css-loader?importLoaders=1"
        }, {
            loader: "sass-loader"
        },{
            loader: "postcss-loader"
        }],
        fallback: "style-loader"
    })
});

config.plugins.push(
    new CleanWebpackPlugin('build', {
        root: commonPath.rootPath,
        verbose: false
    }),
    // 复制静态资源
    new CopyWebpackPlugin([
        {
            context: commonPath.staticDir,
            from: '**/*',
            ignore: ['*.md']
        }
    ]),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        // 公共代码分离打包
        names: ['vendor','mainifest'],
        minChunks: 1
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 30000
    }),
    new ExtractTextPlugin({
        filename: '[name].[contenthash:6].css',
        disable: false,
        allChunks: true
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        favicon: commonPath.favicon,
        template: commonPath.template,
        chunksSortMode: 'dependency', // 在chunk被插入到html之前，控制它们的排序。允许的值 ‘none’ | ‘auto’ | ‘dependency’ | {function} 默认为‘auto’.
        hash: false,
        inject: 'body'
    })
);


module.exports = config;
