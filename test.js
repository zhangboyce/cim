'use strict';

let _ = require('lodash');
let fs = require('fs');

let state = {
    x1: {x: true, o: '1'},
    x2: {x: false, o: '2'},
    x3: {x: true, o: '3'}
};

fs.writeFile("arghhhh.jpg", 'xxoo', function(err) {});

console.log('-------' + _.every(state, 'x', true));
console.log(/^[\w\u4e00-\u9fa5]+$/.test('#$%^&*'));