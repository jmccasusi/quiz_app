const express = require('express');
const bcrypt = require('bcrypt');
const sessions = express.Router();

const User = require('../models/users.js');

sessions.get('/login', (req, res) => {
	res.render('index.ejs', {
        currentUser: req.session.currentUser,
        classification: "strangers",
        pageToRender: "login"
      });
});

sessions.get('/register', (req, res) => {
	res.render('index.ejs', {
        currentUser: req.session.currentUser,
        classification: "strangers",
        pageToRender: "register"
      });
});

sessions.post('/login', (req, res) => {
    console.log('Im here');
    console.log(req.body);
	User.findOne({ name: req.body.name }, (err, foundUser) => {
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