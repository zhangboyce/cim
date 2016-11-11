'use strict';

const stack = [];

export function pushUrlOnEnter(router) {
    push(router.location.pathname);
}

export function popUrlOnLeave(router) {
    return pop();
}

export function push(url) {
    stack.push(url);
}

export function pop() {
    return stack.pop();
}

export function get() {
    return stack[stack.length - 1];
}