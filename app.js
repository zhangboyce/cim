'use strict';

const path = require('path');
const koa = require('koa');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const render = require('koa-swig');
const serve = require('koa-static');

require("babel-register")({
    presets: [
        "es2015","react"
    ],
    extensions: ['.jsx', '.js']
});

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

app.keys = ['cim cim-2016'];
app.use(require('koa-session')(app));

require('./server_routers')(app);
app.use(logger());

app.use(require('koa-static-server')({rootDir: 'public', rootPath: '/public'}));

const appConfig = require('./common/config');
const config  = require('config');
appConfig.set({ HOST: config.get("app.host"), PORT: config.get("app.port") });

//koa router
const koaRouter = require('koa-router')();
koaRouter.get('/*', function *() {
    yield this.render('index', { config: appConfig.getConfig() });
});
app.use(koaRouter.routes()).use(koaRouter.allowedMethods());

//mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongo'));

const port = config.get("app.port") || 7878;
app.listen(port);
console.log('cim listening on port ' + port);