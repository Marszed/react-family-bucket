const path = require('path');

let express = require('express'),
  webpack = require('webpack'),
  config = require('./webpack.dev.conf.js'),
  app = express();

console.log('=========================>>>>');
console.log('=========================>>>>');
console.log('=========================>>>>');
console.log('=========================>>>>');
console.log(process.env.NODE_ENV);

const rootPath = path.resolve(__dirname, '..'), // 项目根目录
    src = path.join(rootPath, 'app'), // 开发源码目录
    env = process.env.NODE_ENV.trim(); // 当前环境


const commonPath = require('./commonPath');

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
