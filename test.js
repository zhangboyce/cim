
const crypto = require('crypto');

let md5 = crypto.createHash('md5');
md5.update('wqwqw');
let validCode = md5.digest('hex');


console.log(validCode);
console.log(validCode.length);