process.traceDeprecation = true;
process.noDeprecation = true;

let webpack = require('webpack'),
    NyanProgressPlugin = require('nyan-progress-webpack-plugin'),
    commonPath = require('./commonPath');

module.exports = {
    entry: {
        // ================================
        // 框架 / 类库 分离打包
        // ================================
        vendor: [

            'babel-polyfill',
            'intl',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux',
            'redux-thunk',
            'rc-form',
            'react-datetime'
        ],
        app: commonPath.path.join(commonPath.src, 'main.js')
    },
    output: {
        path: commonPath.path.join(commonPath.dist, '/')
    },
    resolve: {
        extensions: ['.web.js', '.js', '.jsx', '.json', '.scss', '.css'],
        alias: {
            // ================================
            // 自定义路径别名
            // ================================
            ASSET: commonPath.path.join(commonPath.src, 'asset'),
            COMPONENT: commonPath.path.join(commonPath.src, 'components'),
            LIB: commonPath.path.join(commonPath.src, 'lib'),
            TRD: commonPath.path.join(commonPath.src, '3rd'),
            LANG: commonPath.path.join(commonPath.src, 'lang'),
            CONFIG: commonPath.path.join(commonPath.src, 'config'),
            HTTP: commonPath.path.join(commonPath.src, 'http/ajax'),
            REDUX: commonPath.path.join(commonPath.src, 'redux'),
            INTERFACE: commonPath.path.join(commonPath.src, 'interface'),
            ROUTER: commonPath.path.join(commonPath.src, 'router/config'),
            COMMON: commonPath.path.join(commonPath.src, 'components/common')
        }
    },
    resolveLoader: {
        //root: commonPath.path.join(rootPath, 'node_modules') //webpack2.0 已默认
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: (function() {
                let _loaders = ['babel-loader?' + JSON.stringify({
                    cacheDirectory: true,
                    plugins: [
                        'transform-runtime',
                        'transform-decorators-legacy',
                        ["import", [{ "style": "css", "libraryName": "antd" }]]
                    ],
                    presets: ['es2015', 'react', 'stage-0'],
                    env: {
                        production: {
                            plugins: [
                                'transform-class-properties',
                                'transform-es2015-template-literals',
                                'transform-es2015-literals',
                                'transform-es2015-function-name',
                                'transform-es2015-arrow-functions',
                                'transform-es2015-block-scoped-functions',
                                'transform-es2015-classes',
                                'transform-es2015-object-super',
                                'transform-es2015-shorthand-properties',
                                'transform-es2015-computed-properties',
                                'transform-es2015-for-of',
                                'transform-es2015-sticky-regex',
                                'transform-es2015-unicode-regex',
                                'check-es2015-constants',
                                'transform-es2015-spread',
                                'transform-es2015-parameters',
                                'transform-es2015-destructuring',
                                'transform-es2015-block-scoping',
                                'transform-es2015-typeof-symbol',
                                ['transform-regenerator', {async: false, asyncGenerators: false}],
                                ["import", [{ "style": "css", "libraryName": "antd" }]]
                            ],
                            presets: ['react', 'es2015', 'stage-0']
                        }
                    }
                })];

                // 开发环境下引入 React Hot Loader
                if (commonPath.env === 'development') {
                    _loaders.unshift('react-hot-loader');
                }
                return _loaders;
            })(),
            include: commonPath.src,
            exclude: /node_modules/,
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'img/[name]-[hash:6].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10240, // 10KB 以下使用 base64
                name: 'font/[name]-[hash:6].[ext]'
            }
        }]
    },

    plugins: [
        // 进度条
        new NyanProgressPlugin({
            nyanCatSays: function (progress) {
                return progress === 1 && 'Marszed!';
            }
        }),
        new webpack.DefinePlugin({
            'process.env': { // React/Redux 打包环境配置
                NODE_ENV: JSON.stringify('production')
            },
            // ================================
            // 配置开发全局常量
            // ================================
            __DEV__: commonPath.env === 'development',
            __PROD__: commonPath.env === 'production',
            __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
            __WHY_DID_YOU_UPDATE__: true // 是否检测不必要的组件重渲染
        })
    ]
};