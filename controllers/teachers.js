// DEPENDENCIES
const express = require('express');
const bcrypt = require('bcrypt');
const teachers = express.Router();

const userModel = require('../models/users.js');
const groupModel = require('../models/groups.js')

// ROUTES
teachers.get('/', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "home"
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

// Group Routes
teachers.get('/group/new', (req, res) => {
	// function for generating random key
	const makeid = (length) => {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for ( var i = 0; i < length; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	 }

	let newKey = makeid(8);
	let keySameCount = 0;
	let isUnique = false;
	
	groupModel.Group.find({}, (err, foundGroups) => {
		while(!isUnique){
			foundGroups.forEach((foundGroup) => {
				if(foundGroup.join_key === newKey){
					keySameCount++;
				}
			})
			if(keySameCount === 0){
				isUnique = true;
			} else {
				keySameCount = 0;
				isUnique = false;
			}
		}
	})

	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		generatedKey: newKey,
		pageToRender: "new_group"
	});
});

teachers.get('/group/:id', (req, res) => {
	groupModel.Group.findById(req.params.id, (err, foundGroup) => {
		res.render('index.ejs', {
			currentUser: req.session.currentUser,
			pageToRender: "show_group",
			currentGroup: foundGroup
		})
	})
});

teachers.get('/group', (req, res) => {
	groupModel.Group.find({owner_id: req.session.currentUser._id}, (err, foundGroups) => {
		console.log(foundGroups);
		res.render('index.ejs', {
			currentUser: req.session.currentUser,
			ownedGroups: foundGroups,
			pageToRender: "group"
		});
	})
});

teachers.post('/group/new', (req, res) => {
	req.body.owner_id = req.session.currentUser._id;
	groupModel.Group.create(req.body, (err, createdGroup) => {
		if(err){
			console.log(err);
		} else {
			console.log(createdGroup);
			res.redirect(`${createdGroup._id}`);     
		}
	});
});

// EXPORT
module.exports = teachers;