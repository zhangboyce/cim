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

export function validateEmailUnique(val, message) {
    let url = '/api/user/validate/email/unique';
    return dispath => {
        return get(url, { email: val }).then(result => {
            if (result) {
                dispath(validateUserInfo('email', true, ''));
            } else {
                dispath(validateUserInfo('email', false, message));
            }
        });
    };
}

export function validateMobileUnique(val, message) {
    let url = '/api/user/validate/mobile/unique';
    return dispath => {
        return get(url, { mobile: val }).then(result => {
            if (result) {
                dispath(validateUserInfo('mobile', true, ''));
            } else {
                dispath(validateUserInfo('mobile', false, message));
            }
        });
    };
}

export function validateNameUnique(val, message) {
    let url = '/api/user/validate/name/unique';
    return dispath => {
        return get(url, { name: val }).then(result => {
            if (result) {
                dispath(validateUserInfo('name', true, ''));
            } else {
                dispath(validateUserInfo('name', false, message));
            }
        });
    };
}

export function sendForgetPasswordEmail(email) {
    let url = '/api/user/sendForgetPasswordEmail';
    return dispath => {
        return post(url, { email: email }).then(result => {
            dispath(setForgetPasswordEmailResult(result));
        });
    };
}

export function resetPassword(validCode, password) {
    let url = '/api/user/resetPassword';
    return dispath => {
        return post(url, { validCode: validCode, password: password }).then(result => {
            dispath({
                type: types.RESET_PASS_RESULT,
                data: result
            });
        });
    };
}

export function setForgetPasswordEmailResult(result) {
    return {
        type: types.SEND_FORGET_PASSWORD_EMAIL_RESULT,
        data: result
    }
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

export function addResetPasswordInfo(name, value) {
    return {
        type: types.RESET_PASS_ADD,
        data: { name: name, value: value }
    }
}

export function validateResetPasswordInfo(name, validateResult, massge) {
    return {
        type: types.RESET_PASS_VALIDATE,
        data: { name: name, validateResult: validateResult, message: massge }
    }
}

export function login(name, password) {
    let url = '/api/user/login';
    return dispath => {
        return post(url, { value: value, password: password }).then(result => {
            dispath({
                type: types.LOGIN_RESULT,
                data: result
            });
        });
    };
}