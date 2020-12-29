const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const List = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
})

module.exports = mongoose.model('List', List)