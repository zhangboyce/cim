'use strict';

import fetch from 'isomorphic-fetch';
import _ from 'lodash';

export function get(url, query) {
    url = buildUrl(url);
    if(query) {
        url += ('?' + Object.keys(query).map(q => {
           if(query[q] != undefined) return q + '=' + query[q];
        }).join('&'));
    }
    let options = {
        method: 'GET',
        credentials: 'include'
    };
    console.log(url);
    return fetch(url, options).then(res => res.json());
}

export function post(url, data) {
    url = buildUrl(url);
    let options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    console.log(url);
    return fetch(url, options).then(res => res.json());
}

const buildUrl = function(url) {
    let host = config.get('host');
    if(!host) {
        throw new Error('未正确配置全局变量host, 无法发送api');
    }
    url = ('http://' + host + url);
    return url;
};
