// DEPENDENCIES
const express = require('express');
const bcrypt = require('bcrypt');
const teachers = express.Router();

const User = require('../models/teachers.js');

// ROUTES
teachers.get('/new', (req, res) => {
    res.render('./teachers/new.ejs', {
        currentUser: req.session.currentUser
      });
})

teachers.post('/', (req, res) => {
	req.body.password = bcrypt.hashSync(
		req.body.password,
		bcrypt.genSaltSync(10)
	);
	User.create(req.body, (err, createdUser) => {
		res.redirect('/');
	});
});

// EXPORT
module.exports = teachers;