/**
 * Created by marszed on 2017/2/4.
 */
import { createAction } from '../creater';

/**
 * Toast controller
 * @type {string}
 */
export const TOAST = 'TOAST';
export const SHOW_HIDE_TOAST = 'SHOW_HIDE_TOAST';
export const GLOBAL_LOADING = 'GLOBAL_LOADING';
export const SHOW_HIDE_GLOBAL_LOADING = 'SHOW_HIDE_GLOBAL_LOADING';
export const INLINE_LOADING = "INLINE_LOADING";
export const SHOW_HIDE_INLINE_LOADING = "SHOW_HIDE_INLINE_LOADING";
export const FORM_SEARCH = 'FORM_SEARCH';
export const FORM_RADIO = 'FORM_RADIO';
export const FORM_SLIDER = 'FORM_SLIDER';
export const FORM_RADIO_TYPE = 'FORM_RADIO_TYPE';
export const FORM_SELECT = 'FORM_SELECT';
export const FORM_SELECT_CHECK = 'FORM_SELECT_CHECK';
export const FORM_SELECT_ORDER = 'FORM_SELECT_ORDER';
export const FORM_RADIO_AUTHORIZE = 'FORM_RADIO_AUTHORIZE';
export const SET_AUTO_COMPLETE = 'SET_AUTO_COMPLETE';
export const SET_COMPANY_INFO = 'SET_COMPANY_INFO';
export const SET_USER_INFO = 'SET_USER_INFO';

// 设置公司信息
export const setCompanyInfo = createAction(SET_COMPANY_INFO,'value');
// 设置用户信息
export const setUserInfo = createAction(SET_USER_INFO,'value');
// 更新筛选表单 search组件
export const setFormSearch = createAction(FORM_SEARCH, 'value');
// 更新筛选表单 radio组件
export const setFormRadio = createAction(FORM_RADIO, 'value');
// 更新筛选表单 select组件
export const setFormSelect = createAction(FORM_SELECT, 'value');
// 更新筛选表单 selectCheck组件
export const setFormSelectCheck = createAction(FORM_SELECT_CHECK, 'value');
// 更新筛选表单 selectOrder组件
export const setFormSelectOrder = createAction(FORM_SELECT_ORDER, 'value');
// 更新筛选表单 search组件
export const setFormRadioType = createAction(FORM_RADIO_TYPE, 'value');
// 更新筛选表单 slider组件
export const setFormSlider = createAction(FORM_SLIDER, 'value');
// 更新刷选表单 radioAuthorize组件
export const setFormRadioAuthorize = createAction(FORM_RADIO_AUTHORIZE, 'value');
// 更新筛选表单 1，2地区选择组件
export const setAutoComplete = createAction(SET_AUTO_COMPLETE, 'value');

// 显示关闭toast
export const toast = createAction(TOAST, 'value');
// 显示toast,自动关闭
export const showToast = function(obj){
    return (dispatch) => {
        // 先展示
        dispatch(createAction(SHOW_HIDE_TOAST, 'value')({
            content: obj.content || "",
            state: obj.state || ""
        }));
        // 后隐藏
        setTimeout(() => {
            dispatch(createAction(SHOW_HIDE_TOAST, 'value')({
                content: "",
                state: obj.state || ""
            }));
        }, (obj.timer || 4) * 1000);
    };
};
// 显示关闭全局loading
export const globalLoading = createAction(GLOBAL_LOADING, 'value');
// 显示全局loading,自动关闭
export const showGlobalLoading = function(obj){
    return (dispatch) => {
        // 先展示
        dispatch(createAction(SHOW_HIDE_GLOBAL_LOADING, 'value')(obj.content || ""));
        // 后隐藏
        setTimeout(() => {
            dispatch(createAction(SHOW_HIDE_GLOBAL_LOADING, 'value')(""));
        }, (obj.timer || 0) * 1000);
    };
};
// 显示关闭内联loading
export const inlineLoading = createAction(INLINE_LOADING, 'value');
// 显示内联loading,自动关闭
export const showInlineLoading = function(obj){
    return (dispatch) => {
        // 先展示
        dispatch(createAction(SHOW_HIDE_INLINE_LOADING, 'value')(obj.content || ""));
        // 后隐藏
        setTimeout(() => {
            dispatch(createAction(SHOW_HIDE_INLINE_LOADING, 'value')(""));
        }, (obj.timer || 0) * 1000);
    };
};
