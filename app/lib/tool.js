/**
 * Created by Marszed on 2017/2/2.
 */

const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

// get query key-value
export function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.locationHref.split('?')[1] ? window.locationHref.split('?')[1].match(reg) : '';
    if (r !== null) {
        return decodeURI(r[2]);
    }
    return null;
}

// timeDate format
export function timeFormat(format, date, datePipe, timePipe) {
    let type = typeof date;
    datePipe = (typeof datePipe !== 'undefined') ? datePipe : '-';
    timePipe = (typeof timePipe !== 'undefined') ? timePipe : ':';
    let ret = null, oDate = null;
    if (type === 'string' || type === "number") {
        oDate = new Date(date);
    } else if (type === 'object') {
        oDate = date;
    } else {
        oDate = new Date();
    }

    let Y = oDate.getFullYear(), M = oDate.getMonth() + 1, D = oDate.getDate();
    let H = oDate.getHours(), I = oDate.getMinutes(), S = oDate.getSeconds();

    let c = function (a, pipe) {
        let ret = [];
        for (let i = 0, len = a.length; i < len; i++) {
            let x = a[i];
            x = x < 10 ? '0' + x : x;
            ret.push(x);
        }
        return ret.join(pipe);
    };

    switch (format) {
        case 'YM':
            ret = c([Y, M], datePipe);
            break;
        case 'MD':
            ret = c([M, D], datePipe);
            break;
        case 'HI':
            ret = c([H, I], timePipe);
            break;
        case 'HIS':
            ret = c([H, I, S], timePipe);
            break;
        case 'IS':
            ret = c([I, S], timePipe);
            break;
        case 'YMDHI':
            ret = c([Y, M, D], datePipe) + ' ' + c([H, I], timePipe);
            break;
        case 'YMDHIS':
            ret = c([Y, M, D], datePipe) + ' ' + c([H, I, S], timePipe);
            break;
        case 'YMD':
            ret = c([Y, M, D], datePipe);
            break;
        default:
            ret = c([Y, M, D], datePipe);
    }
    return ret;
}


//get sessionStorage
export function getSessionStorage(key) {
    let r;
    if (window.sessionStorage) {
        r = JSON.parse(window.sessionStorage.getItem(key));
    }
    return r;
}

//set sessionStorage
export function setSessionStorage(key, value) {
    value = JSON.stringify(value);
    if (window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
    }
}

//get localStorage
export function getLocalStorage(key) {
    let r;
    try {
        if (window.localStorage) {
            r = JSON.parse(window.localStorage.getItem(key));
        }
    } catch (e) {
        return r;
    }
    return r;
}

// set localStorage
export function setLocalStorage(key, value) {
    value = JSON.stringify(value);
    if (window.localStorage) {
        window.localStorage.setItem(key, value);
    }
}

// del localStorage
export function delLocalStorage(key) {
    if (window.localStorage) {
        window.localStorage.removeItem(key);
    }
}

// clear all localStorage
export function clearAllStorage() {
    window.localStorage.clear();
}

// update localStorage key value
export function updateLocalStorage(type, key, val) {
    let obj = getLocalStorage(type) ? getLocalStorage(type) : false;
    if (obj) {
        for (let k in obj) {
            if (k === key) {
                if (val === 'delete') {
                    delete obj[k];
                    setLocalStorage(type, obj);
                    break;
                } else {
                    obj[key] = val;
                }
            } else {
                obj[val.proId] = val;
            }
            setLocalStorage(type, obj);
        }
    } else {
        let temp = {};
        temp[key] = val;
        setLocalStorage(type, temp);
    }
}

// get set cookie
export function cookie(name, value, options) {
    if (typeof value !== 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options = Object.assign({}, options);
            options.expires = -1;
        }
        let expires = '';
        if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
            let date;
            if (typeof options.expires === 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        let path = options.path ? '; path=' + (options.path) : '';
        let domain = options.domain ? '; domain=' + (options.domain) : '';
        let secure = options.secure ? '; secure' : '';
        document.cookie = [
            name,
            '=',
            encodeURIComponent(value),
            expires,
            path,
            domain,
            secure
        ].join('');
    } else {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0, len = cookies.length; i < len; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}

// base64加密
export function encode64(input) {
    input = escape(input);
    let output = "";
    let chr1, chr2, chr3 = "";
    let enc1, enc2, enc3, enc4 = "";
    let i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output;
}

// base64解密
export function decode64(input) {
    let output = "";
    let chr1, chr2, chr3 = "";
    let enc1, enc2, enc3, enc4 = "";
    let i = 0;
    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    let base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        console && console.log("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 !== 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
            output = output + String.fromCharCode(chr3);
        }
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return unescape(output);
}

// language package inject
export function langPackageInject() {
    if (cookie('language')) {
        return cookie('language');
    }

    switch (window.navigator.language.toLowerCase().split(/[_-]+/)[0]) {
        case 'en':
            return 'en_US';
        case 'zh':
            return 'zh_CN';
        default:
            return 'en_US';
    }
}

// 对象数组排序
export function keySort(propertyName, type) {
    return function (object1, object2) {
        let value1 = object1[propertyName];
        let value2 = object2[propertyName];
        if (value2 < value1) {
            return type === true ? -1 : 1;
        } else if (value2 > value1) {
            return type === true ? 1 : -1;
        } else {
            return 0;
        }
    };
}

// 千分位格式化
export function formatMoney (s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    let l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i ++ ) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

// 对象值是否全等
export function isEqual(a, b) {
    try {
        return JSON.stringify(a) === JSON.stringify(b);
    } catch (e) {
        return null;
    }
}

// 奇淫巧技,深拷贝对象，弊端 对象的函数属性会被过滤掉
export function objCopy(a) {
    try {
        return JSON.parse(JSON.stringify(a));
    } catch (e) {
        return null;
    }
}

// 奇淫巧技,深拷贝数组
export function arrayCopy(a) {
    if (a instanceof Array) {
        return [...a];
    }
    return null;
}

// throttle 等时间间隔执行函数
// throttle(function (event) {console.log('the Ajax request');}, 1000))
export function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    let last, timer;
    return function () {
        let context = scope || this;

        let now = +new Date(),
            args = arguments;
        if (last && now - last + threshhold < 0) {
            window.clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

// debounce 时间间隔 t 内若再次触发事件，则重新计时，直到停止时间大于或等于 t 才执行函数。
// debounce(function (event) {console.log('the Ajax request')}, 250));
export function debounce(fn, delay) {
    let timer = null;
    return function () {
        let context = this, args = arguments;
        window.clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

/**
 * String prototype expend
 * @returns {*}
 */
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

