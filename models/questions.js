const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    owner_id: {type: String, required: true},
    content: {type: String, required: true},
    options: Array,
    correctAnswer: {type: String, required: true},
    tags: {type: String}
});

const Question = mongoose.model('Question', questionSchema);

module.exports = {
    Question: Question
};
