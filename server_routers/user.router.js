'use strict';
const parse = require('co-body');
const User = require('../models/User');
const router = require('koa-router')();

router.post('/api/user/register', function *() {
    let data = yield parse(this);

    let user = new User(data);
    yield user.save();

    this.body = user;
});

router.get('/api/user/validate/email/unique', function *() {
    let email = this.query.email;
    let user = yield User.findOne({ email: email });
    this.body = user ? false : true;
});

router.get('/api/user/validate/mobile/unique', function *() {
    let mobile = this.query.mobile;
    let user = yield User.findOne({ mobile: mobile });
    this.body = user ? false : true;
});

module.exports = router;