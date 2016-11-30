const mongoose = require('mongoose');

var ColumnSchema = new mongoose.Schema({
    name: String,
    createTime:{ type:Date,default:Date.now }
});

module.exports = mongoose.model('Column', ColumnSchema);