import * as types from '../constants/ActionTypes';

export function reloaded(data) {
    return {
        type: types.RELOADED,
        data: data
    }
}
