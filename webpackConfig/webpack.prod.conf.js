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
    // 删除build文件夹
    new CleanWebpackPlugin('build', {
        root: commonPath.rootPath,
        verbose: false
    }),
    // 和其他插件不同，它用于将 webpack 1 迁移至 webpack 2。在 webpack 2 中，对 webpack.config.js 的结构要求变得更加严格；不再开放扩展给其他的 loader/插件。webpack 2 推荐的使用方式是直接传递 options 给 loader/插件（换句话说，配置选项将不是全局/共享的）
    new webpack.LoaderOptionsPlugin({
        minimize: true, // loader 是否要切换到优化模式
        debug: false // loader 是否为 debug 模式。debug 在 webpack 3 中将被移除
    }),
    // 将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件
    new ExtractTextPlugin({
        filename: '[name].[contenthash:6].css',
        allChunks: true // 当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时，allChunks **必须设置为 true
    }),
    // 公共代码分离打包
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
    }),
    // 解决 若路由分配不合理，会打包出很多很小的文件，每个文件或许只有几k，却多了很多网络请求，得不偿失
    new webpack.optimize.AggressiveMergingPlugin(),
    // 通过合并小于 minChunkSize 大小的 chunk，将 chunk 体积保持在指定大小限制以上。
    new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 30000
    }),
    // 压缩js
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false, // 是否需要看到警告日志
            drop_debugger: true, // 是否需要移除js中的debugger断点
            drop_console: true // 是否需要移除js中的日志输出
        }
    }),
    // 复制静态资源
    new CopyWebpackPlugin([
        {
            context: commonPath.staticDir,
            from: '**/*',
            ignore: ['*.md']
        }
    ]),
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
