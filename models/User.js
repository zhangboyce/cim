const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    registerTime:{ type:Date,default:Date.now }
});

module.exports = mongoose.model('User', UserSchema);