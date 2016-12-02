const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    columnName: String,
    name: String,
    email: String,
    password: String,
    mobile: String,
    avatarName: String,
    registerTime:{ type:Date,default:Date.now }
});

module.exports = mongoose.model('User', UserSchema);