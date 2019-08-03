const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = require('./users.js');
// const examSchema = require('./exam.js');

const groupSchema = new Schema({
    name: {type: String, required: true, unique: true},
    join_key: {type: String, required: true},
    owner: {type: String, required: true},
    exams: Array
});

const Group = mongoose.model('Group', groupSchema);

module.exports = {
    Group: Group,
    groupSchema: groupSchema
}
