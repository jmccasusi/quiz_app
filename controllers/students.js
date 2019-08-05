// DEPENDENCIES
const express = require('express');
const bcrypt = require('bcrypt');
const students = express.Router();

const userModel = require('../models/users.js');
const groupModel = require('../models/groups.js');

// ROUTES
students.get('/', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "home"
	});
});

students.get('/new', (req, res) => {
    res.render('./students/new.ejs', {
        currentUser: req.session.currentUser
      });
})

// GROUPS ROUTES
students.get('/group/join', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "join_group"
	});
});

students.get('/group/:id', (req, res) => {
	groupModel.Group.findById(req.params.id, (err, foundGroup) => {
		userModel.User.findById(foundGroup.owner_id, (err, foundUser) => {
			res.render('index.ejs', {
				currentUser: req.session.currentUser,
				pageToRender: "show_group",
				currentGroup: foundGroup,
				ownerName: `${foundUser.firstName} ${foundUser.lastName}`
			})
		})
	})
});

students.get('/group', (req, res) => {
	groupModel.Group.find({members_ids: {$all: [req.session.currentUser._id] }}, (err, foundGroups) => {
		console.log(foundGroups);
		res.render('index.ejs', {
			currentUser: req.session.currentUser,
			ownedGroups: foundGroups,
			pageToRender: "group"
		});
	})
});

students.post('/group/join', (req, res) => {
	groupModel.Group.findOneAndUpdate({join_key: req.body.join_key}, {$addToSet:{members_ids: req.session.currentUser._id}}, { new: true }, (err, foundGroup) => {
		if(err){
			console.log(err);
		} else {
			console.log(foundGroup);
			res.redirect(`${foundGroup._id}`);     
		}
	});
});

// EXPORT
module.exports = students;