/**
 * Created by marszed on 2017/2/4.
 */
import { createAction } from '../creater';

/**
 * Toast controller
 * @type {string}
 */
export const TYPE = 'TYPE';
export const COUNTRY = 'COUNTRY';
export const PROJECT_LIST = 'PROJECT_LIST';
export const SEARCH_OPTIOPN = 'SEARCH_OPTIOPN';
export const SET_FORM_BOX= 'SET_FORM_BOX'; // 是否展开筛选条件


// 项目管理 设置项目类型
export const setType = createAction(TYPE, 'value');
// 项目管理 设置国家类型
export const setCountry = createAction(COUNTRY, 'value');
// 项目管理 设置项目列表
export const setProjectList = createAction(PROJECT_LIST, 'value');
// 项目管理 设置筛选条件
export const setSearchOption = createAction(SEARCH_OPTIOPN, 'value');
// 展开缩进筛选表单
export const setFormBox = createAction(SET_FORM_BOX, 'value');

// 项目管理 清空redux缓存
export const clearProject = function(){
    return (dispatch) => {
        dispatch(createAction(TYPE, 'value')(''));
        dispatch(createAction(COUNTRY, 'value')(''));
    };
};

