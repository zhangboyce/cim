'use strict';
module.exports = function (server) {
    const user = require('./user.router');
    const column = require('./column.router');
    server.use(user.routes()).use(user.allowedMethods());
    server.use(column.routes()).use(column.allowedMethods());
};