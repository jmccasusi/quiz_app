const express = require('express');
const bcrypt = require('bcrypt');
const sessions = express.Router();

const userModel = require('../models/users.js');

sessions.get('/login', (req, res) => {

    if(req.session.currentUser){
        res.redirect('/');
    } else {
        res.render('index.ejs', {
            currentUser: {classification: "strangers"},
            pageToRender: "login"
          });
    }
});

sessions.get('/register', (req, res) => {
    if(req.session.currentUser){
        res.redirect('/');
    } else {
        res.render('index.ejs', {
            currentUser: {classification: "strangers"},
            pageToRender: "register"
          });
    }
});

sessions.post('/login', (req, res) => {
    console.log('Im here');
    console.log(req.body);
	userModel.User.findOne({ email: req.body.email }, (err, foundUser) => {
        if(err){
            console.log(err);
        } else {
            if(foundUser){
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    req.session.currentUser = foundUser;
                    res.redirect('/');
                } else {
                    res.render('index.ejs', {
                        currentUser: {classification: "strangers"},
                        pageToRender: "login",
                        errMessage: "Wrong email-address/password entered."
                    })
                }
            } else {
                res.render('index.ejs', {
                    currentUser: {classification: "strangers"},
                    pageToRender: "login",
                    errMessage: "Wrong email-address/password entered."
                })
            }
        }
	});
});


sessions.post('/register', (req, res) => {
    if(req.body.password === req.body.passwordCheck){
        req.body.password = bcrypt.hashSync(
            req.body.password,
            bcrypt.genSaltSync(10)
        );
        userModel.User.create(req.body, (err, createdUser) => {
            if(err){
                res.render('index.ejs', {
                    currentUser: {classification: "strangers"},
                    pageToRender: "register",
                    errMessage: "Email address has already been used by another account."
                })
            } else {
                req.session.currentUser = createdUser;
                console.log(createdUser);
                res.redirect('/');     
            }
        });
    } else {
        res.render('index.ejs', {
            currentUser: {classification: "strangers"},
            pageToRender: "register",
            errMessage: "Passwords do not match."
        })
    }

	
});

sessions.delete('/logout', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
});

module.exports = sessions;