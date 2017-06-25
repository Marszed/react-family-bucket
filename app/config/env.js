/**
 * Created by Marszed on 2017/2/2.
 */
const windowOrigin = window.location.href;
/**
 * 接口调用地址配置
 * @type {{pro: {origin: string}, qa: {origin: string}, sit: {origin: string}}}
 */
let hostConfig = {
    pro: {
        origin: window.location.protocol + '//' + window.location.host
    },
    test: {
        // origin: 'http://172.23.1.15:8080' // 周超
        // origin: 'http://172.23.1.14:8080' // 陈远长
        origin: 'http://172.23.1.11:8080' // 詹铁强
        // origin: 'http://localhost:8080' // 本地服务器
        // origin: 'http://agent_dev.ipx.net' // 开发服务器
        // origin: 'http://agent_t.ipx.net:9090' // 测试服务器
        // origin: 'http://agent.ipx.net' // 正式服务器
    }
};

const localOrigin = windowOrigin.substr(0, 10);

let env = {
    config: (localOrigin === 'http://loc' || localOrigin === 'http://172') ? hostConfig.test : hostConfig.pro
};

export default env;