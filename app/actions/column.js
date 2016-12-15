'use strict';

import { get } from './fetch';
import * as types from '../constants/ActionTypes';
import { reloaded } from './common';
import { loginUserFailure } from './user';
import { browserHistory } from 'react-router';

export function listHotColumns(token) {
    let url = '/api/column/list/hot';
    return accessProtected(types.LIST_HOT_COLUMNS, url, {}, token)
}

export function listColumns(token) {
    let url = '/api/column/list';
    return accessProtected(types.LIST_COLUMNS, url, {}, token)
}

export function viewColumn(_id, token) {
    let url = '/api/column/detail';
    return accessProtected(types.VIEW_COLUMN, url, { _id: _id }, token)
}

export function listColumnSearchTags(token) {
    let url = '/api/column/searchTag/list';
    return accessProtected(types.LIST_COLUMN_SEARCH_TAGS, url, { }, token)
}

export function searchColumns(keyword, token) {
    let url = '/api/column/search/list';
    return accessProtected(types.LIST_SEARCH_COLUMN, url, { keyword: keyword }, token)
}

function accessProtected(type, url, params, token) {
    return dispatch => {
        dispatch(reloaded(false));
        return get(url, params, token).then(response => {
            if (response.status == 200) {
                dispatch({
                    type: type,
                    data: response.data
                });
                dispatch(reloaded(true));
            } else if(response.status === 401) {
                dispatch(loginUserFailure(response));
                browserHistory.push('/user/login');
            }
        });
    };
}

export function toggleColumnSearchTag(name, value) {
    return {
        type: types.TOGGLE_COLUMN_SEARCH_TAG,
        data: { name: name, value: value }
    }
}