'use strict';
const parse = require('co-body');
const Column = require('../models/Column');
const router = require('koa-router')();
const config = require('../common/config');
const jwt = require('jsonwebtoken');

router.get('/api/column/list/hot', function *() {
    yield validToken.apply(this, [function*() {
        let hotColumns = yield Column.find({ }).sort({ views: -1, likes: -1, collections: -1 }).limit(5);
        this.body = { status: 200, data: hotColumns }
    }]);

});

router.get('/api/column/search/list', function *() {
    yield validToken.apply(this, [function*() {
        let keyword = this.query.keyword;
        if (keyword) {
            var re = new RegExp(keyword);
            let columns = yield Column.find({ $or: [
                { name: re },
                { type: re },
                { status: re },
                { time: re },
                { description: re }
            ]});
            this.body = { status: 200, data: columns }
        } else {
            this.body = { status: 200, data: [] }
        }
    }]);
});

router.get('/api/column/list', function *() {
    yield validToken.apply(this, [function*() {
        let columns = yield Column.find({ }).sort({ views: -1, likes: -1, collections: -1 });
        this.body = { status: 200, data: columns }
    }]);
});

router.get('/api/column/detail', function *() {
    yield validToken.apply(this, [function*() {
        let _id = this.query._id;
        let column = yield Column.findOne({ _id: _id });
        yield Column.update({ _id: _id }, { $inc: { views: 1 } });
        this.body = { status: 200, data: column }
    }]);
});

router.get('/api/column/searchTag/list', function *() {
    yield validToken.apply(this, [function*() {

        let times = yield Column.distinct('time');
        let types = yield Column.distinct('types');
        let status = yield Column.distinct('status');

        let list = [
            { name: '分类', values: ['推荐', '最热', '最新'] },
            { name: '状态', values: status },
            { name: '时长', values: times },
            { name: '类型', values: types }
        ];

        this.body = { status: 200, data: list }
    }]);
});

function *validToken(callback) {
    let token = this.headers['authorization'];
    if (!token) {
        this.body = { status: 401, statusText: 'Not found token.' };
    } else {
        try {
            console.log('token: ' + token);
            let decoded = jwt.verify(token, config.get('TOKEN_KEY'));
            yield callback.call(this);
        } catch (e) {
            console.log(e);
            this.body = { status: 401, statusText: 'Token is invalid.' };
        }
    }
}

module.exports = router;