import * as types from '../constants/ActionTypes';

export function reloaded(type, data) {
    return {
        type: type,
        data: data
    }
}