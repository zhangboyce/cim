'use strict';
const parse = require('co-body');
const Activity = require('../models/Activity');
const router = require('koa-router')();

router.get('/', function *() {
    yield this.render('index');
});

router.get('/list', function *() {
    let pageSize = 20;
    let page = this.query.page||1;
    if(page < 1) {
        page = 1;
    }
    let offset = (page - 1) * pageSize;

    let activities = yield Activity.find({}).sort({dateCreated:-1}).skip(offset).limit(pageSize);

    this.body = activities;
});

router.post('/add', function *() {
    let data = yield parse(this);

    if (!data.name || !data.url) {
        this.body = 'error';
        return;
    }

    let activity = new Activity({name: data.name, url: data.url});
    yield activity.save();

    this.body = activity;
});

router.post('/edit/:id', function *() {
    let data = yield parse(this);
    let name = data.name;
    let url = data.url;
    let id = this.params.id;

    yield Activity.update({_id:id}, {$set:{name:name, url: url}});

    this.body = 'ok';
});

router.post('/delete/:id', function *(){
    let id = this.params.id;
    yield Activity.remove({_id: id});
    this.body = 'ok';
});

module.exports = router;