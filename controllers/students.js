// DEPENDENCIES
const express = require('express');
const bcrypt = require('bcrypt');
const students = express.Router();

const User = require('../models/users.js');

// ROUTES
students.get('/home', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		classification: "students",
		pageToRender: "home"
	});
});

students.get('/group', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		classification: "students",
		pageToRender: "group"
	});
});

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