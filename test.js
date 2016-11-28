'use strict';

const path = require('path');
const koa = require('koa');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const render = require('koa-swig');
const serve = require('koa-static');

const app = koa();

app.use(function *(next) {
    try {
        yield next;
    }catch(e) {
        if(e.name == 'NotFoundError') {
            this.status = 404;
            yield this.render('404');
        }else {
            console.log(e.stack);
            this.body = '服务器故障,请联络管理员';
        }
    }
});

// context render
app.context.render = render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    ext: 'html'
});

// server routers
const activityRouter = require('./server_routers/activity.router.js');
app.use(activityRouter.routes()).use(activityRouter.allowedMethods());
app.use(logger());

app.use(require('koa-static-server')({rootDir: 'public', rootPath: '/public'}));

//koa router
const koaRouter = require('koa-router')();
koaRouter.get('/*', function *() {
    console.log('------------');
    yield this.render('index');
});
app.use(koaRouter.routes()).use(koaRouter.allowedMethods());

//mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cim');

const port = 8888;
app.listen(port);
console.log('Activity Manager listening on port ' + port);