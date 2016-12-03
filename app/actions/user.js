'use strict';

import { get, post } from './fetch';
import * as types from '../constants/ActionTypes';
import { reloaded } from './common';

export function register(user, avatarData) {
    let url = '/api/user/register';
    return dispatch => {
        return post(url, user).then(json => {
            if (json._id && avatarData) {
                // chrome fetch error cannot be resolved, so use jquery ajax api to send big data.
                $.post('/api/user/register/saveAvatar', { _id: json._id, avatarData: avatarData }, ()=> {
                    console.log('Save avatar.')
                });
            }
            dispatch({
                type: types.REGISTER_USER_SUCCESS,
                data: user
            });
        });
    };
}

export function addUserInfo(name, value) {
    return {
        type: types.ADD_USER_INFO,
        data: { name: name, value: value }
    }
}

export function validateUserInfo(name, validateResult, massge) {
    return {
        type: types.VALIDATE_USER_INFO,
        data: { name: name, validateResult: validateResult, message: massge }
    }
}