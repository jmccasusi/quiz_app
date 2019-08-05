const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    owner_id: {type: String, required: true},
    content: {type: String, required: true},
    type: {type: String, required: true},
    category: {type: String, required: true},
    options: Array,
    answers: Array,
    tags: Array
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
