'use strict';

import { get } from './fetch';
import * as types from '../constants/ActionTypes';
import { reloaded } from './common';

const hotColumns = [
    {
        id:1,
        name: '创客遇美丽',
        types: ['综艺', '互动', '相亲', '交友'],
        time: '60~90min',
        description: '筹客和创客有着很多共同的特质，他们都很有逼格，有情怀、有态度、有梦想，有探索精神。通过京东众筹平台，他们聚合在一起深度互动，并将创造全新的商业模式：C2C2B'

    },
    {
        id: 2,
        name: '创客学院',
        types: ['交友'],
        time: '0~60min',
        description: '移动互联网时代，智能硬件领域的创业者越来越多，而当这些创客和创业者们绞尽脑汁地通过自己的产品改变世界的时候，他们还缺点什么呢？'

    },
    {
        id: 3,
        name: '网红助力新创客',
        types: ['真人秀', '访谈', '科技', '交友'],
        time: '60~90min',
        description: '任何一个硬件，都需要经过一个样本量足够大的群体使用之后，反馈了很多点并进行改进之后，才能日臻完善。'

    },
    {
        id: 4,
        name: '创投江湖',
        types: ['综艺', '互动', '相亲', '交友'],
        time: '120min以上',
        description: ''

    }
];

export function listHotColumns() {
    return dispatch => {
        dispatch(reloaded(false));
        dispatch({
            type: types.LIST_HOT_COLUMNS,
            data: hotColumns
        });
        dispatch(reloaded(true));
    };
}


const column_search_tags = [
    {
        name: '分类',
        values: ['推荐', '最热', '最新']
    },
    {
        name: '状态',
        values: ['已认播', '已赞助', '招商中', '认播中', '制作中']
    },
    {
        name: '时长',
        values: ['0~60min', '60~90min', '90~120min', '120min以上']
    },
    {
        name: '类型',
        values: ['综艺', '访谈', '科技', '记录', '电影', '电视剧', '真人秀', '其他']
    }
];

export function listColumnSearchTags() {
    return {
        type: types.LIST_COLUMN_SEARCH_TAGS,
        data: column_search_tags
    }
}

export function toggleColumnSearchTag(name, value) {
    return {
        type: types.TOGGLE_COLUMN_SEARCH_TAG,
        data: { name: name, value: value }
    }
}


const columns = [
    {
        id:1,
        name: '创客遇美丽',
        types: ['综艺', '互动', '相亲', '交友'],
        time: '60~90min',
        description: '筹客和创客有着很多共同的特质，他们都很有逼格，有情怀、有态度、有梦想，有探索精神。通过京东众筹平台，他们聚合在一起深度互动，并将创造全新的商业模式：C2C2B'

    },
    {
        id: 2,
        name: '创客学院',
        types: ['交友'],
        time: '0~60min',
        description: '移动互联网时代，智能硬件领域的创业者越来越多，而当这些创客和创业者们绞尽脑汁地通过自己的产品改变世界的时候，他们还缺点什么呢？'

    },
    {
        id: 3,
        name: '网红助力新创客',
        types: ['真人秀', '访谈', '科技', '交友'],
        time: '60~90min',
        description: '任何一个硬件，都需要经过一个样本量足够大的群体使用之后，反馈了很多点并进行改进之后，才能日臻完善。'

    },
    {
        id: 4,
        name: '创投江湖',
        types: ['综艺', '互动', '相亲', '交友'],
        time: '120min以上',
        description: ''

    }
    ,
    {
        id: 5,
        name: '创投江湖',
        types: ['综艺', '互动', '相亲', '交友'],
        time: '120min以上',
        description: ''

    },
    {
        id: 6,
        name: '创投江湖',
        types: ['综艺', '互动', '相亲', '交友'],
        time: '120min以上',
        description: ''

    },
    {
        id: 7,
        name: '创投江湖',
        types: ['综艺', '互动', '相亲', '交友'],
        time: '120min以上',
        description: ''

    },
    {
        id: 8,
        name: '创投江湖',
        types: ['综艺', '互动', '相亲', '交友'],
        time: '120min以上',
        description: ''

    },
    {
        id: 9,
        name: '创投江湖',
        types: ['综艺', '互动', '相亲', '交友'],
        time: '120min以上',
        description: ''

    },
    {
        id: 10,
        name: '创投江湖',
        types: ['综艺', '互动', '相亲', '交友'],
        time: '120min以上',
        description: ''

    },
    {
        id: 11,
        name: '创投江湖',
        types: ['综艺', '互动', '相亲', '交友'],
        time: '120min以上',
        description: ''

    },
    {
        id: 12,
        name: '创投江湖',
        types: ['综艺', '互动', '相亲', '交友'],
        time: '120min以上',
        description: ''

    }
];


export function listColumns() {
    return dispatch => {
        dispatch(reloaded(false));
        dispatch({
            type: types.LIST_COLUMNS,
            data: columns
        });
        dispatch(reloaded(true));
    };
}