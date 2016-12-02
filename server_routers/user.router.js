'use strict';
const parse = require('co-body');
const User = require('../models/User');
const router = require('koa-router')();
const fs = require('fs');
const Buffer = require('buffer').Buffer;
const path = require('path');
const appDir = path.dirname(require.main.filename);

router.post('/api/user/register', function *() {
    let data = yield parse(this);
    let user = new User(data);
    yield user.save();

    this.body = user;
});

router.post('/api/user/register/saveAvatar', function *() {
    let data = yield parse(this, { limit: '10mb'});
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

router.get('/api/user/validate/mobile/unique', function *() {
    let mobile = this.query.mobile;
    let user = yield User.findOne({ mobile: mobile });
    this.body = user ? false : true;
});

module.exports = router;