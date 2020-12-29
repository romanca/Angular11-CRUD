const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
}, {
    collection: 'todos'
})

module.exports = mongoose.model('Todo', Todo)