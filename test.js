
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

let obj = {
    o1: 0,
    o4: 'xx00',
    o2: [],
    o3: ['zzz']
};

console.log(_.values(obj));
console.log(_.every(obj, o => o));

if ([]) console.log('ca'.split(','));