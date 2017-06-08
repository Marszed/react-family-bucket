/**
 * Created by Marszed on 2017/3/3.
 */

/**
 * react及其插件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';
import store from 'REDUX/store/global'; // redux store引入
import 'ASSET/css/DanUI.css'; // 公共样式引入
import 'ASSET/css/ipx_agent_main.css';
import 'ASSET/css/ipxfont.css';
import 'ASSET/css/jslider.css';

/**
 * 自定义工具方法库
 */
import {langPackageInject} from "LIB/tool";

/**
 * 国际化
 */
import {addLocaleData, IntlProvider} from "react-intl";
import zh from "react-intl/locale-data/zh";
import en from "react-intl/locale-data/en";
// 加载全局国际化语言包
import globalZHCN from "LANG/global_zh";
import globalEnUS from "LANG/global_en";

addLocaleData([...en, ...zh]);
let globalLang = (langPackageInject().indexOf('zh') !== -1) ? globalZHCN : globalEnUS;

let globalLocale = (langPackageInject().indexOf('zh') !== -1) ? "zh" : "en";

// 路由配置表
import ROUTER from "ROUTER";


/**
 * 下面用于检测不必要的重新渲染，详情请看其项目地址：
 * https://github.com/garbles/why-did-you-update
 * 提示组件是否有无效的渲染
 * 有关性能提升方面的问题
 * 诸如 PureComponent / shouldComponentUpdate / Immutable.js 等
 */

if (__DEV__ && __WHY_DID_YOU_UPDATE__ && 0) {
    const {whyDidYouUpdate} = require('why-did-you-update');
    whyDidYouUpdate(React);
}
if (__DEV__) {
    console.info('[当前环境] 开发环境');
}
if (__PROD__) {
    console.info('[当前环境] 生产环境');
}

/**
 * 自定义根组件
 */
import App from './components/app.jsx';

/**
 *
 * @param option 验证类型 默认验证登陆
 * @param nextState 目标路由信息
 * @param replace 跳转api
 * @return next
 */
let globalAuth = (option, nextState, replace) => {
    // 登录拦截
    if (!window.localStorage.getItem("isLogin") || !window.localStorage.getItem("userInfo")) {
        replace({pathname: '/'});
    }
};

/**
 * 路由配置
 * 通过getComponent做路由懒加载, require.ensure 做 webpack chunk
 */

const routes = <Route path="/" component={App}>
    <IndexRedirect to={ROUTER.LOGIN}/>
    <Route path={ROUTER.LOGIN}
           getComponent={(nextState, callback) => {
               require.ensure([], (require) => {
                   callback(null, require("./components/account/login")['default']);
               }, "login");
           }}/>
    <Route path={ROUTER.FIRSTLOGIN}
           getComponent={(nextState, callback) => {
               require.ensure([], (require) => {
                   callback(null, require("./components/account/firstLogin")['default']);
               }, "firstLogin");
           }}/>
    <Route path={ROUTER.FORGETPASSWORD}
           getComponent={(nextState, callback) => {
               require.ensure([], (require) => {
                   callback(null, require("./components/account/forgetPassword")['default']);
               }, "forgetPassword");
           }}/>
    {/*<Route path={ROUTER.DASHBOARD}
           onEnter={globalAuth.bind(this, "login")}
           getComponent={(nextState, callback) => {
               require.ensure([], (require) => {
                   callback(null, require("./components/dashboard/dashboard")['default']);
               }, "dashboard");
           }}/>*/}
    <Route path={ROUTER.PROJECTLISTING}
           onEnter={globalAuth.bind(this, "login")}
           getComponent={(nextState, callback) => {
               require.ensure([], (require) => {
                   callback(null, require("./components/projectListing/home")['default']);
               }, "projectListing");
           }}>
        <IndexRedirect to={'/' + ROUTER.PROJECTLISTING + '/1/country.000/' + ROUTER.OVERVIEW}/>
        <Route path={':type/:country/' + ROUTER.OVERVIEW}
               getComponent={(nextState, callback) => {
                   require.ensure([], (require) => {
                       callback(null, require("./components/projectListing/overview")['default']);
                   }, "overview");
               }}/>
        <Route path={ROUTER.VIEW}
               getComponent={(nextState, callback) => {
                   require.ensure([], (require) => {
                       callback(null, require("./components/projectListing/viewHome")['default']);
                   }, "viewHome");
               }}>
            <IndexRedirect to={'/' + ROUTER.PEOJECTLIST + '/' + ROUTER.VIEW + '/' + ROUTER.DETAIL}/>
            <Route path={ROUTER.DETAIL}
                   getComponent={(nextState, callback) => {
                       require.ensure([], (require) => {
                           callback(null, require("./components/projectListing/detailHome")['default']);
                       }, "detailHome");
                   }}>
                <IndexRedirect to={'/' + ROUTER.PEOJECTLIST + '/' + ROUTER.VIEW + '/' + ROUTER.DETAIL + '/' + ROUTER.MSG + '/:projectId'}/>
                <Route path={ROUTER.MSG + "/:projectId"}
                       getComponent={(nextState, callback) => {
                           require.ensure([], (require) => {
                               callback(null, require("./components/projectListing/common/detail/msg")['default']);
                           }, "msg");
                       }}>
                </Route>
                <Route path={ROUTER.AROUND + "/:projectId"}
                       getComponent={(nextState, callback) => {
                           require.ensure([], (require) => {
                               callback(null, require("./components/projectListing/common/detail/around")['default']);
                           }, "around");
                       }}>
                </Route>
                <Route path={ROUTER.DOCUMENT + "/:projectId"}
                       getComponent={(nextState, callback) => {
                           require.ensure([], (require) => {
                               callback(null, require("./components/projectListing/common/detail/document")['default']);
                           }, "document");
                       }}>
                </Route>
                <Route path={ROUTER.PROGRESS + "/:projectId"}
                       getComponent={(nextState, callback) => {
                           require.ensure([], (require) => {
                               callback(null, require("./components/projectListing/common/detail/progress")['default']);
                           }, "progress");
                       }}>
                </Route>
            </Route>
            <Route path={ROUTER.PROPERTY + "/:projectId"}
                   getComponent={(nextState, callback) => {
                       require.ensure([], (require) => {
                           callback(null, require("./components/projectListing/common/property")['default']);
                       }, "property");
                   }}/>
            <Route path={ROUTER.SALES + "/:projectId"}
                   getComponent={(nextState, callback) => {
                       require.ensure([], (require) => {
                           callback(null, require("./components/projectListing/common/sales")['default']);
                       }, "sales");
                   }}/>
        </Route>
    </Route>
    <Route path={ROUTER.PERSONSETTING}
           onEnter={globalAuth.bind(this, "login")}
           getComponent={(nextState, callback) => {
               require.ensure([], (require) => {
                   callback(null, require("./components/personSetting/home")['default']);
               }, "personSetting");
           }}>
        <IndexRedirect to={'/' + ROUTER.PERSONSETTING + '/' + ROUTER.PERSONINFO}/>
        <Route path={ROUTER.PERSONINFO}
               getComponent={(nextState, callback) => {
                   require.ensure([], (require) => {
                       callback(null, require("./components/personSetting/personInfo")['default']);
                   }, "personInfo");
               }}/>
        <Route path={ROUTER.SECURITYSETTING}
               getComponent={(nextState, callback) => {
                   require.ensure([], (require) => {
                       callback(null, require("./components/personSetting/securitySetting")['default']);
                   }, "securitySetting");
               }}/>
        <Route path={ROUTER.PERSONALISATIONSETTING}
               getComponent={(nextState, callback) => {
                   require.ensure([], (require) => {
                       callback(null, require("./components/personSetting/personalisationSetting")['default']);
                   }, "personalisationSetting");
               }}/>
    </Route>
    <Route path={ROUTER.RESETEMAILCONFIRM}
           getComponent={(nextState, callback) => {
               require.ensure([], (require) => {
                   callback(null, require("./components/personSetting/modifyEmail")['default']);
               }, "modifyEmail");
           }}/>
    <Route path="*"
           getComponent={(nextState, callback) => {
               require.ensure([], (require) => {
                   callback(null, require("./components/common/404")['default']);
               }, "404");
           }}/>
</Route>;


/**
 * 路由，数据池注入
 */
ReactDOM.render(
    <IntlProvider locale={globalLocale} messages={globalLang}>
        <Provider store={store}>
            <Router history={hashHistory} routes={routes}/>
        </Provider>
    </IntlProvider>, document.getElementById('app'));