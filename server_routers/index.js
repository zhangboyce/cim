'use strict';
module.exports = function (server) {
    const user = require('./user.router');
    const column = require('./column.router');
    server.use(user.routes()).use(user.allowedMethods());

    //server.use(function *(next) {
    //    let sess = this.session;
    //    console.log('-----' + this.url);
    //
    //    if (this.url === '/login' || sess.user ) {
    //        yield next;
    //        return;
    //    }
    //    this.redirect('/login');
    //});

    server.use(column.routes()).use(column.allowedMethods());
};