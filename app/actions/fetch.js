'use strict';

import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import config from '../../common/config';

export function get(url, query, token) {
    url = buildUrl(url);
    if(query) {
        url += ('?' + Object.keys(query).map(q => {
           if(query[q] != undefined) return q + '=' + query[q];
        }).join('&'));
    }
    let options = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': token
        }
    };
    console.log(url);
    return fetch(url, options).then(res => res.json());
}

export function post(url, data, token) {
    url = buildUrl(url);
    let opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    };
    return fetch(url, opts).then(res => res.json());
}

const buildUrl = function(url) {
    let host = `${config.get('HOST')}:${config.get('PORT')}`;
    if(!host) {
        throw new Error('未正确配置全局变量host, 无法发送api');
    }
    url = ('http://' + host + url);
    return url;
};
