/**
 * Created by marszed on 2017/3/3.
 */
const path = require('path');

const rootPath = path.resolve(__dirname, '..'), // 项目根目录
    src = path.join(rootPath, 'app'); // 开发源码目录


module.exports = {
    path: path,
    src: path.join(rootPath, 'app'), // 开发源码目录
    env: process.env.NODE_ENV.trim(), // 当前环境
    rootPath: rootPath, // 项目根目录
    dist: path.join(rootPath, 'build'), // build 后输出目录
    SOURCE_MAP: false, // js source map
    template: path.join(src, 'index.html'), // 打包入口模板页
    staticDir: path.join(rootPath, 'static'), // 无需处理的静态资源目录
    favicon: path.join(src, 'favicon.ico'), // favicon.ico
    port: 15556, // web 服务监听端口
    ipConfig: "172.23.1.13" || "127.0.0.1" // 本机ip地址
};