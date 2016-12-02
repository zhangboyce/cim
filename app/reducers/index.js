'use strict';

import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';
import _ from 'lodash';

export default combineReducers({
    global,
    hotColumns,
    columns,
    column,
    columnFilters,
    user
});

function global(state = {}, action) {
    switch (action.type){
        case types.GLOBAL: {
            return action.data;
        }
        default:
            return state;
    }
}

function hotColumns(state = {}, action) {
    return combineReducers({
        list,
        reloaded
    })(state, action);

    function list(state = [], action) {
        switch (action.type){
            case types.LIST_HOT_COLUMNS: {
                return  action.data;
            }
            default:
                return state;
        }
    }

    function reloaded(state = false, action) {
        switch (action.type){
            case types.RELOADED:
                return action.data;
            default:
                return state;
        }
    }
}

function columns(state = {}, action) {
    return combineReducers({
        list,
        reloaded
    })(state, action);

    function list(state = [], action) {
        switch (action.type){
            case types.LIST_COLUMNS: {
                return  action.data;
            }
            default:
                return state;
        }
    }

    function reloaded(state = false, action) {
        switch (action.type){
            case types.RELOADED:
                return action.data;
            default:
                return state;
        }
    }
}

function column(state = {}, action) {
    switch (action.type){
        case types.VIEW_COLUMN: {
            return action.data;
        }
        default:
            return state;
    }
}

function columnFilters(state = {}, action) {
    return combineReducers({
        list,
        selected
    })(state, action);

    function list(state = [], action) {
        switch (action.type){
            case types.LIST_COLUMN_SEARCH_TAGS: {
                return  action.data;
            }
            default:
                return state;
        }
    }

    function selected(state = {}, action) {
        switch (action.type){
            case types.TOGGLE_COLUMN_SEARCH_TAG: {
                let name = action.data.name;
                let value = action.data.value;
                let values = state[name];

                let o = {};

                if (!values) {
                    o[name] = [value];
                }
                else if (values.findIndex(v => v == value) == -1) {
                    o[name] = [value, ...values];
                }
                else {
                    let nvs = [...values];
                    _.remove(nvs, v => v == value);
                    o[name] = nvs
                }

                return _.assign({}, state, o);
            }
            default:
                return state;
        }
    }
}


function user(state = {}, action) {
    return combineReducers({
        register
    })(state, action);

    function register(state = {
        columnName: {},
        name: {},
        email: {},
        password: {},
        rePassword: {},
        mobile: {}
    }, action) {
        switch (action.type){
            case types.ADD_USER_INFO: {
                let data = action.data;
                let obj = {};
                obj[data.name] = _.assign({}, state[data.name], { value: data.value });
                return _.assign({}, state, obj);
            }

            case types.VALIDATE_USER_INFO: {
                let data = action.data;
                let vr = data.validateResult;
                let obj = {};
                obj[data.name] = _.assign({}, state[data.name], { validation: vr.validation, message: vr.message });
                return _.assign({}, state, obj);
            }

            case types.REGISTER_USER_SUCCESS: {
                return {
                    columnName: {},
                    name: {},
                    email: {},
                    password: {},
                    rePassword: {},
                    mobile: {}
                };
            }

            default:
                return state;
        }
    }

}