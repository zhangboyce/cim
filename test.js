var config = require('config');
let url = config.get('mongo');
let mongoClient = require('mongodb').MongoClient;

const mongoose = require('mongoose');
mongoose.connect(url);

console.log(url);
let db = mongoClient.connect(url).then(db => {
    console.log("Connect mongo db: " + url);
    return db;
}).catch(err => {
    console.log("Connect mongo db: " + url + " error." + err);
});


//const EmailUtils = require('./email/EmailUtils');
//EmailUtils.sendEmail('598698658@qq.com', 'forget-password.template.html', {url: 'xxoo'});

//const mongoose = require('mongoose');
//mongoose.connect(config.get('mongo'));