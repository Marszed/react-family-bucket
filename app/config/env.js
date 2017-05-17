/**
 * Created by Marszed on 2017/2/2.
 */
const windowOrigin = window.location.origin;

/**
 * 接口调用地址配置
 * @type {{pro: {origin: string}, qa: {origin: string}, sit: {origin: string}}}
 */
let hostConfig = {
    pro: {
        origin: windowOrigin
    },
    test: {
        origin: 'http://172.23.1.15:8080' // 周超
        // origin: 'http://172.23.1.14:8080' // 陈远长
        // origin: 'http://localhost:8080' // 本地服务器
        // origin: 'http://agency_dev.ipx.net' // 开发服务器
        // origin: 'http://agency_t.ipx.net:9090' // 测试服务器
    }
};

let env = {
    config: windowOrigin.indexOf("localhost") !== -1 ? hostConfig.test : hostConfig.pro
};

export default env;