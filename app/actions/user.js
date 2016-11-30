'use strict';

import { get, post } from './fetch';
import * as types from '../constants/ActionTypes';
import { reloaded } from './common';

export function register(user) {
    let url = '/api/user/register';
    return dispatch => {
        return post(url, user).then(json => {
            if (json.result._id) {
                dispatch({
                    type: types.REGISTER_USER_SUCCESS,
                    data: user
                });
            }
        }) ;
    };
}

export function addUserInfo(name, value) {
    return {
        type: types.ADD_USER_INFO,
        data: { name: name, value: value }
    }
}

export function validateUserInfo(name, validateResult) {
    return {
        type: types.VALIDATE_USER_INFO,
        data: { name: name, validateResult: validateResult }
    }
}