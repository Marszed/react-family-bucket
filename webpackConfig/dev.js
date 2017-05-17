const path = require('path');

let express = require('express'),
  webpack = require('webpack'),
  config = require('./webpack.dev.conf.js'),
  app = express();

const rootPath = path.resolve(__dirname, '..'), // 项目根目录
    src = path.join(rootPath, 'app'), // 开发源码目录
    env = process.env.NODE_ENV.trim(); // 当前环境


const commonPath = {
    rootPath: rootPath,
    dist: path.join(rootPath, 'build'), // build 后输出目录
    template: path.join(src, 'index.html'), // 打包入口模板页
    staticDir: path.join(rootPath, 'static'), // 无需处理的静态资源目录
    favicon: path.join(src, 'favicon.ico'), // favicon.ico
    port: 13330
};

let compiler = webpack(config);

// for highly stable resources
app.use('/asset', express.static(commonPath.staticDir));


// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler));

app.listen(commonPath.port, '127.0.0.1', function(err) {
    err && console.log(err);
});
