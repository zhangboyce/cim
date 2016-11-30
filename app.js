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

// init config
require('dotenv').config({silent: true});
const env = process.env;
const config = require('./common/config');
config.set({ HOST: env.HOST, PORT: env.PORT });

//koa router
const koaRouter = require('koa-router')();
koaRouter.get('/*', function *() {
    yield this.render('index', { config: config.getConfig() });
});
app.use(koaRouter.routes()).use(koaRouter.allowedMethods());

//mongoose
mongoose.Promise = global.Promise;
mongoose.connect(env.MONGO);

const port = env.PORT;
app.listen(port);
console.log('Activity Manager listening on port ' + port);