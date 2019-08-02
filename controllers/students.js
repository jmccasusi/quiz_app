// DEPENDENCIES
const express = require('express');
const bcrypt = require('bcrypt');
const students = express.Router();

const User = require('../models/users.js');

// ROUTES
students.get('/new', (req, res) => {
    res.render('./students/new.ejs', {
        currentUser: req.session.currentUser
      });
})

students.post('/', (req, res) => {
	req.body.password = bcrypt.hashSync(
		req.body.password,
		bcrypt.genSaltSync(10)
	);
	User.create(req.body, (err, createdUser) => {
		res.redirect('/');
	});
});

// EXPORT
module.exports = students;