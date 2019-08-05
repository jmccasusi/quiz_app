// DEPENDENCIES
const express = require('express');
const bcrypt = require('bcrypt');
const students = express.Router();

const userModel = require('../models/users.js');

// ROUTES
students.get('/', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "home"
	});
});

students.get('/group/join', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "join_group"
	});
});

students.get('/group', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "group"
	});
});

students.get('/new', (req, res) => {
    res.render('./students/new.ejs', {
        currentUser: req.session.currentUser
      });
})

// EXPORT
module.exports = students;