import {combineReducers} from "redux";
import {createReducer} from "../creater";
import {
    TOAST,
    SHOW_HIDE_TOAST,
    GLOBAL_LOADING,
    SHOW_HIDE_GLOBAL_LOADING,
    SHOW_HIDE_INLINE_LOADING,
    INLINE_LOADING,
    FORM_SEARCH,
    FORM_RADIO,
    FORM_SELECT,
    FORM_SLIDER,
    FORM_SELECT_CHECK,
    FORM_SELECT_ORDER,
    FORM_RADIO_TYPE,
    FORM_RADIO_AUTHORIZE,
    SET_AUTO_COMPLETE,
    SET_COMPANY_INFO,
    SET_USER_INFO,
    GLOBAL_CONFIRM
} from "../actions/global";

export default combineReducers({
    globalConfirm: createReducer('', {
        [GLOBAL_CONFIRM](state, {value}){
            return value;
        }
    }),
    toast: createReducer('', {
        [TOAST](state, {value}){
            return value;
        },
        [SHOW_HIDE_TOAST](state, {value}){
            return value;
        }
    }),
    globalLoading: createReducer('', {
        [GLOBAL_LOADING](state, {value}){
            return value;
        },
        [SHOW_HIDE_GLOBAL_LOADING](state, {value}){
            return value;
        }
    }),
    inlineLoading: createReducer('', {
        [INLINE_LOADING](state, {value}){
            return value;
        },
        [SHOW_HIDE_INLINE_LOADING](state, {value}){
            return value;
        }
    }),
    formSearch: createReducer('', {
        [FORM_SEARCH](state, {value}){
            return value;
        }
    }),
    companyInfo: createReducer('', {
        [SET_COMPANY_INFO](state, {value}){
            return value;
        }
    }),
    userInfo: createReducer('', {
        [SET_USER_INFO](state, {value}){
            return value;
        }
    }),
    formRadio: createReducer('', {
        [FORM_RADIO](state, {value}){
            return value;
        }
    }),
    formRadioType: createReducer('', {
        [FORM_RADIO_TYPE](state, {value}){
            return value;
        }
    }),
    formRadioAuthorize: createReducer('', {
        [FORM_RADIO_AUTHORIZE](state, {value}){
            return value;
        }
    }),
    formSlider: createReducer('', {
        [FORM_SLIDER](state, {value}){
            return value;
        }
    }),
    formSelect: createReducer('', {
        [FORM_SELECT](state, {value}){
            return value;
        }
    }),
    formSelectCheck: createReducer('', {
        [FORM_SELECT_CHECK](state, {value}){
            return value;
        }
    }),
    formSelectOrder: createReducer('', {
        [FORM_SELECT_ORDER](state, {value}){
            return value;
        }
    }),
    formAutoComplete: createReducer('', {
        [SET_AUTO_COMPLETE](state, {value}){
            return value;
        }
    })
});