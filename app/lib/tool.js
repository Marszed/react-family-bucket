/**
 * Created by Marszed on 2017/2/2.
 */

const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

// get query key-value
export function getQueryString(name) {
    let locationHref = window.location.href;
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = locationHref.split('?')[1] ? locationHref.split('?')[1].match(reg) : '';
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

    switch ((window.navigator.language || window.navigator.browserLanguage).toLowerCase().split(/[_-]+/)[0]) {
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

// 数组删除指定元素
export function removeByValue(arr, val) {
    let temp = [];
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] !== val) {
            temp.push(arr[i]);
        }
    }
    return temp;
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
    if(r === '00' || r === '0'){
        return t.split("").reverse().join("");
    } else{
        return t.split("").reverse().join("") + "." + r;
    }
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

// 移动设备判断 包括ipad
export function isMobile() {
    let check = false;
    (function (a) {
        if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

/**
 * String prototype expend
 * @returns {*}
 */
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

