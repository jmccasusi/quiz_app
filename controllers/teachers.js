// DEPENDENCIES
const express = require('express');
const bcrypt = require('bcrypt');
const teachers = express.Router();

const User = require('../models/users.js');

// ROUTES
teachers.get('/', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		classification: "teachers",
		pageToRender: "home"
	});
});

teachers.get('/group', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		classification: "teachers",
		pageToRender: "group"
	});
});

teachers.get('/exam', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		classification: "teachers",
		pageToRender: "exam"
	});
});

teachers.get('/question', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		classification: "teachers",
		pageToRender: "question"
	});
});

teachers.get('/new', (req, res) => {
    res.render('./teachers/new.ejs', {
        currentUser: req.session.currentUser
      });
});

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