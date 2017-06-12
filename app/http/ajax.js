/**
 * Created by Marszed on 2017/3/3.
 */
import axios from "axios";
import env from "CONFIG/env";
import store from "REDUX/store/global";
import {showToast, globalLoading, inlineLoading} from "REDUX/actions/global";
import qs from "qs";

// TODO delete
import locationMock from "INTERFACE/response";

const tipTime = 3;

/**
 * loading 控制器
 * @param obj
 * @param state
 * state-true 显示loading state-false 关闭loading
 * obj.loadingContent loading展示文案
 */
function loadingHandler(obj, state) {
    if (obj.loading !== false && state) {
        if (obj.inlineLoading) {
            // 内联Loading
            store.dispatch(inlineLoading(obj.loadingContent || "加载中"));
        } else {
            store.dispatch(globalLoading(obj.loadingContent || "加载中"));
        }
    }
    if (obj.loading !== false && !state) {
        if (obj.inlineLoading) {
            store.dispatch(inlineLoading(''));
        } else {
            store.dispatch(globalLoading(''));
        }
    }
}

/**
 * toast 控制器
 * @param obj
 * obj.toastContent toast展示文案
 */
function toastHandler(obj) {
    if (obj.toast !== false) {
        store.dispatch(showToast({
            content: obj.toastContent || "加载中",
            state: obj.state
        }));
    }
}


export function asyncAwaitCall(obj) {
    //从localStorage中取出token
    let token = window.localStorage.getItem("token");
    //TODO 登录不需要token,获取验证码和判断账号是否需要验证码都不需要token
    if (!token && obj.url.value.indexOf("login") === -1 && obj.url.value.indexOf("code") === -1) {
        window.localStorage.clear();
        window.location = '/';
    }
    let headers = Object.assign(obj.headers || {}, {Authorization: 'bearer ' + token});
    return new Promise(function (resolve) {
        // ==========发起请求前-开启loading=============
        loadingHandler(obj, true);

        axios.request({
            // `url` is the server URL that will be used for the request
            url: obj.url.value,

            // `method` is the request method to be used when making the request
            method: obj.method, // default

            // `baseURL` will be prepended to `url` unless `url` is absolute.
            // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
            // to methods of that instance.
            baseURL: obj.baseURL || env.config.origin,

            // `responseType` indicates the type of data that the server will respond with
            // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
            responseType: obj.responseType || 'json', // default

            // Override timeout default for the library
            // Now all requests will wait 32 seconds before timing out
            timeout: obj.timeout || 32 * 1000,

            // `withCredentials` indicates whether or not cross-site Access-Control requests
            // should be made using credentials
            // default false
            withCredentials: obj.withCredentials || true,

            // `data` is the data to be sent as the request body
            // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
            // When no `transformRequest` is set, must be of one of the following types:
            // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
            // - Browser only: FormData, File, Blob
            // - Node only: Stream
            data: obj.dataSerialize ? qs.stringify(obj.data || '') : (obj.data || ''),

            // `params` are the URL parameters to be sent with the request
            // Must be a plain object or a URLSearchParams object
            params: obj.params || '',

            // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
            // This will set an `Authorization` header, overwriting any existing
            // `Authorization` custom headers you have set using `headers`.
            auth: obj.auth || '',

            // `headers` are custom headers to be sent
            headers: headers
        }).then(function (response) {

            // ==========接收成功响应-关闭loading=============
            loadingHandler(obj, false);
            if ((response.status >= 200 && response.status < 300) && (response.data.header && response.data.header.code === '0000')) {
                return resolve(response);
            }

            // ==========接收出错响应-3s-关闭toast提示=============
            toastHandler({
                toastContent: response.data.header ? response.data.header.message : (obj.toastContent || "net error"),
                toast: obj.toast,
                state: 2
            });

            return resolve({data: response.data, errType: "error"});
        })['catch'](function (error) {
            // ==========异常响应-关闭loading=============
            loadingHandler(obj, false);
            if (error.response && error.response.status === 401) {
                toastHandler({toastContent: obj.toastContent || "Unauthorized", state: 2, toast: obj.toast});
                //登录超时或者伪造token等情况
                setTimeout(() => {
                    window.localStorage.clear();
                    window.location = '/';
                }, 2 * 1000);
            } else {
                // ==========异常响应-关闭toast===============
                toastHandler({toastContent: obj.toastContent || "server exception", state: 2, toast: obj.toast});
            }

            // TODO delete 本地mock
            // return resolve({data: locationMock[obj.url.key]});


            return resolve({data: {}, errType: "broken"});
        });
    });
}

export function getUploader(obj){
    return {
        action: env.config.origin + obj.action, // 必选参数, 上传的地址
        headers: obj.headers || {Authorization: 'bearer ' + window.localStorage.getItem("token")},
        data: obj.data || "", // 上传所需参数或返回上传参数的方法
        accept: obj.accept || '*', // 接受上传的文件类型
        disabled: obj.disabled || false, // 是否禁用
        multiple: obj.multiple || false, // 是否允许同时选择多文件,不支持IE9-
        withCredentials: obj.withCredentials || true, // 上传请求时是否携带 cookie
        fileSize: obj.fileSize || 10, // 单个文件大小
        numberLimit: obj.numberLimit || 1, // 允许一次上传数量
        showUploadList: obj.showUploadList || false // 是否展示 uploadList, 可设为一个对象，用于单独设定 showPreviewIcon 和 showRemoveIcon
    };
}

