let commonPath = require('./commonPath'),
    webpack = require('webpack'),
    config = require('./webpack.base.conf.js'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin')

config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';

config.devtool = commonPath.SOURCE_MAP ? 'eval-source-map' : false;

// react 热插拔
config.entry.app = [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/only-dev-server',
    config.entry.app
];

config.output.publicPath = '/';

// 开发环境下直接内嵌 CSS 以支持热替换
config.module.rules.push({
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader?importLoaders=1',
        'postcss-loader'
    ]
}, {
    test: /\.scss$/,
    use: [
        'style-loader',
        'css-loader?importLoaders=1',
        'postcss-loader',
        'sass-loader'
    ]
}, {
    test: /\.less$/,
    use: [
        'style-loader',
        'css-loader?importLoaders=1',
        'postcss-loader',
        'less-loader'
    ]
});

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
        filename: '[name].css',
        disable: false,
        allChunks: true
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        favicon: commonPath.favicon,
        template: commonPath.template,
        chunksSortMode: 'none',
        hash: true
    }),
    new BrowserSyncPlugin({
        host: commonPath.ipConfig,
        port: commonPath.port,
        proxy: 'http://127.0.0.1:' + commonPath.port + '/',
        logConnections: false,
        notify: false
    }, {
        reload: false
    })
);

module.exports = config;
