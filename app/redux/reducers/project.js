import {combineReducers} from "redux";
import {createReducer} from "../creater";
import {
    TYPE,
    COUNTRY,
    SEARCH_OPTIOPN,
    PROJECT_LIST,
    SET_FORM_BOX
} from "../actions/project";

export default combineReducers({
    type: createReducer('', {
        [TYPE](state, {value}){
            return value;
        }
    }),
    country: createReducer('', {
        [COUNTRY](state, {value}){
            return value;
        }
    }),
    projectList: createReducer('', {
        [PROJECT_LIST](state, {value}){
            return value;
        }
    }),
    searchOption: createReducer('', {
        [SEARCH_OPTIOPN](state, {value}){
            return value;
        }
    }),
    formBox: createReducer('', {
        [SET_FORM_BOX](state, {value}){
            return value;
        }
    })
});