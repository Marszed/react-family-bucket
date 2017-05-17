/**
 * Created by marszed on 2017/2/4.
 */
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import global from "../reducers/global";
import project from "../reducers/project";
import {logger, crashReporter} from "../middleware/logger";

const reducers = {
    global,
    project
};

let store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk, logger, crashReporter)
);

export default store;