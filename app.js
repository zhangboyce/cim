'use strict';
const path = require('path');
const koa = require('koa');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const render = require('koa-swig');
const serve = require('koa-static');

const activityRouter = require('./server_routers/activity.router.js');

const app = koa();
app.context.render = render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    //cache: 'memory', // disable, set to false
    ext: 'html'
});

// routers
app.use(activityRouter.routes()).use(activityRouter.allowedMethods());
app.use(logger());

app.use(require('koa-static-server')({rootDir: 'public', rootPath: '/public'}));

//mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/activity');

const port = 8888;
app.listen(port);
console.log('Activity Manager listening on port ' + port);