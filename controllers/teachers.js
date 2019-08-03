// DEPENDENCIES
const express = require('express');
const bcrypt = require('bcrypt');
const teachers = express.Router();

const userModel = require('../models/users.js');

// ROUTES
teachers.get('/', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "home"
	});
});

teachers.get('/group', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "group"
	});
});

teachers.get('/exam', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "exam"
	});
});

teachers.get('/question', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "question"
	});
});

teachers.get('/new', (req, res) => {
    res.render('./teachers/new.ejs', {
        currentUser: req.session.currentUser
      });
});

// EXPORT
module.exports = teachers;