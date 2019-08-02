const express = require('express');
const bcrypt = require('bcrypt');
const sessions = express.Router();

const Students = require('../models/students.js');
const Teachers = require('../models/teachers.js');

sessions.get('/new', (req, res) => {
	res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
      });
});

sessions.post('/login', (req, res) => {
    console.log('Im here');
    console.log(req.body);
	Students.findOne({ name: req.body.name }, (err, foundUser) => {
        if(err){
            console.log(err);
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/');
            } else {
                res.redirect('./new');
            }
        }
	});
});

sessions.delete('/', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
});

module.exports = sessions;