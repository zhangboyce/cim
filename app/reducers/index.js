'use strict';

import { createReducer } from '../utils';
import { combineReducers } from 'redux';

import * as types from '../constants/ActionTypes';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';

export default combineReducers({
    hotColumns,
    columns,
    column,
    columnFilters,
    user
});

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
        register,
        resetPassword,
        sendForgetPasswordEmailResult,
        auth
    })(state, action);

    function sendForgetPasswordEmailResult(state = false, action) {
        switch (action.type){
            case types.SEND_FORGET_PASSWORD_EMAIL_RESULT: {
                return action.data;
            }
            default:
                return state;
        }
    }

    function auth(state = {
        token: '',
        user: {},
        isAuthenticated: false,
        isAuthenticating: false,
        statusText: ''
    }, action) {
        switch (action.type){
            case types.LOGIN_USER_REQUEST: {
                return _.assign({}, state, {
                    'isAuthenticating': true,
                    'statusText': null
                });
            }

            case types.LOGIN_USER_SUCCESS: {
                let data = action.data;
                return _.assign({}, state, {
                    'isAuthenticating': false,
                    'isAuthenticated': true,
                    'token': data,
                    'user': jwtDecode(data).user,
                    'statusText': 'You have been successfully logged in.'
                });
            }

            case types.LOGIN_USER_FAILURE: {
                let data = action.data;
                return _.assign({}, state, {
                    'isAuthenticating': false,
                    'isAuthenticated': false,
                    'token': null,
                    'userName': null,
                    'statusText': `Authentication Error: ${data.status} ${data.statusText}`
                });
            }

            case types.LOGOUT_USER: {
                let data = action.data;
                return _.assign({}, state, {
                    'isAuthenticated': false,
                    'token': null,
                    'userName': null,
                    'statusText': 'You have been successfully logged out.'
                });
            }

            default:
                return state;
        }
    }

    function register(state = {
        columnName: {},
        name: {},
        email: {},
        password: {},
        rePassword: {},
        mobile: {},
        avatarData: { validateResult: true }
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
                let obj = {};
                obj[data.name] = _.assign({}, state[data.name], { validateResult: data.validateResult, message: data.message });
                return _.assign({}, state, obj);
            }

            case types.REGISTER_USER_SUCCESS: {
                return {
                    columnName: {},
                    name: {},
                    email: {},
                    password: {},
                    rePassword: {},
                    mobile: {},
                    avatarData: { validateResult: true }
                };
            }

            default:
                return state;
        }
    }

    function resetPassword(state = {
        password: {},
        rePassword: {},
        reseted: false
    }, action) {
        switch (action.type){
            case types.RESET_PASS_ADD: {
                let data = action.data;
                let obj = {};
                obj[data.name] = _.assign({}, state[data.name], { value: data.value });
                return _.assign({}, state, obj);
            }

            case types.RESET_PASS_VALIDATE: {
                let data = action.data;
                let obj = {};
                obj[data.name] = _.assign({}, state[data.name], { validateResult: data.validateResult, message: data.message });
                return _.assign({}, state, obj);
            }

            case types.RESET_PASS_RESULT: {
                return {
                    password: {},
                    rePassword: {},
                    reseted: action.data
                };
            }

            default:
                return state;
        }
    }
}