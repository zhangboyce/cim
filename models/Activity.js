const mongoose = require('mongoose');

var Activity = new mongoose.Schema({
    name: String,
    url: String,
    dateCreated:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Activity', Activity);