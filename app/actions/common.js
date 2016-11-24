import * as types from '../constants/ActionTypes';

export function reloaded(data) {
    return {
        type: types.RELOADED,
        data: data
    }
}

export function global() {
    return {
        type: types.GLOBAL,
        data: {  }
    }
}
