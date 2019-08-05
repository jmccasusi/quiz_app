const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupModel = require('./groups.js');

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    classification: {type: String, required: true},
    password: {type: String, required: true},
    groups_ids: Array,
    grades_objects: Array
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User: User,
    userSchema: userSchema
};
