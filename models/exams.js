const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
    title: {type: String, required: true},
    owner_id: {type: String, required: true},
    category: {type: String, required: true},
    questions_ids: Array
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
