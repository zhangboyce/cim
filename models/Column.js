const mongoose = require('mongoose');

var ColumnSchema = new mongoose.Schema({
    name: String,
    status: Array,
    types: Array,
    time: String,
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    collections: { type: Number, default: 0 },
    description: String,
    createTime:{ type:Date, default: Date.now }
});

module.exports = mongoose.model('Column', ColumnSchema);