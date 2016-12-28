'use strict';
const parse = require('co-body');
const User = require('../models/User');
const router = require('koa-router')();
const fs = require('fs');
const Buffer = require('buffer').Buffer;
const path = require('path');
const crypto = require('crypto');
const randomstring = require('randomstring');
const appDir = path.dirname(require.main.filename);
const EmailUtils = require('../email/EmailUtils');
const config = require('config');
const jwt = require('jsonwebtoken');

router.post('/api/user/register', function *() {
    let data = yield parse(this);
    let user = new User(data);
    yield user.save();

    this.body = user;
});

router.post('/api/user/login', function *() {
    let data = yield parse(this);
    let value = data.value;
    let password = data.password;

    console.log(value);
    console.log(password);

    let user = yield User.findOne({ $or:[{ name: value }, { email: value }, { mobile: value }], password: password});
    if (user) {
        var token = jwt.sign({ user: {
            columnName: user.columnName,
            username: user.name,
            email: user.email,
            mobile: user.mobile,
            avatarName: user.avatarName,
            _id: user._id
        } }, config.get('token_key'));

        this.body = { status: 200, token: token };
    } else {
        this.body = { status: 403, token: null, statusText: '用户名或者密码不正确!' };
    }
});

router.post('/api/user/register/saveAvatar', function *() {
    let data = yield parse(this, { limit: '50mb'});
    let _id = data._id;
    let avatarData = data.avatarData;

    let matches = avatarData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches && matches.length == 3) {
        let type = matches[1];

        let imageTypeDetected = type.match(/\/(.*?)$/);
        let base64Data = new Buffer(matches[2], 'base64');

        let avatarName = new Date().getTime() + '.' + imageTypeDetected[1];
        let dir = `${appDir}/public/imgs/users/${ _id }/`;
        fs.mkdir(dir, () => {
            fs.writeFile(dir + avatarName, base64Data, ()=> {
                console.log('Save user avatar: ', dir + avatarName);
            });
        });

        yield User.update({ _id: _id }, { $set: { avatarName: avatarName } });
    }
    this.body = 'ok';
});

router.get('/api/user/validate/email/unique', function *() {
    let email = this.query.email;
    let user = yield User.findOne({ email: email });
    this.body = user ? false : true;
});

router.get('/api/user/validate/email/registered', function *() {
    let email = this.query.email;
    let user = yield User.findOne({ email: email });

    console.log(email);
    console.log(JSON.stringify(user));

    this.body = user ? true : false;
});

router.get('/api/user/validate/mobile/unique', function *() {
    let mobile = this.query.mobile;
    let user = yield User.findOne({ mobile: mobile });
    this.body = user ? false : true;
});

router.get('/api/user/validate/name/unique', function *() {
    let name = this.query.name;
    let user = yield User.findOne({ name: name });
    this.body = user ? false : true;
});

router.post('/api/user/sendForgetPasswordEmail', function *() {
    let data = yield parse(this);
    let email = data.email;
    let user = yield User.findOne( {email: email });
    if (user) {
        let validCode = user.validCode;
        if (!validCode) {
            let md5 = crypto.createHash('md5');
            md5.update(email + new Date().getTime);
            validCode = md5.digest('hex');
            user.validCode = validCode;
            yield user.save();
        }
        let validUrl = `http://${config.get('app.host')}:${config.get('app.port')}/api/user/toResetPassword/${validCode}`;
        EmailUtils.sendEmail(email, 'forget-password.template.html', {url: validUrl});
        this.body = true;
        return;
    }
    this.body = false;
});

router.get('/api/user/toResetPassword/:validCode', function *() {
    let validCode = this.params.validCode;
    if (!validCode) {
        this.body = '<script>alert("无效链接!");location.href="/user/forgetPassword";</script>';
        return;
    }
    let user = yield User.findOne({validCode: validCode});
    if (!user) {
        this.body = ('<script>alert("链接已经失效!");location.href="/user/forgetPassword";</script>');
        return;
    }
    this.body = (`<script>location.href="/user/resetPassword/${validCode}";</script>`);
});

router.post('/api/user/validCode', function *() {
    let data = yield parse(this);
    let validCode = data.validCode;
    if (!validCode || validCode.length != 32) {
        this.body = false;
        return;
    }
    let user = yield User.findOne({validCode: validCode});
    if (!user) {
        this.body = false;
        return;
    }
    this.body = true;
});

router.post('/api/user/resetPassword', function *() {
    let data = yield parse(this);
    let validCode = data.validCode;
    let password = data.password;
    yield User.update({ validCode: validCode }, { $set: { validCode: null, password: password } });

    this.body = ('<script>location.href=`/user/login`;</script>');
});

module.exports = router;