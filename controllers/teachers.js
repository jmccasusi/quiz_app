// DEPENDENCIES
const express = require('express');
const bcrypt = require('bcrypt');
const teachers = express.Router();

const userModel = require('../models/users.js');
const groupModel = require('../models/groups.js');
const examModel = require('../models/exams.js');
const questionModel = require('../models/questions.js')

// ROUTES
teachers.get('/', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "home"
	});
});
// Question Routes
teachers.get('/question/new', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "new_question"
	});
});

teachers.get('/question/edit/:id', (req, res) => {
	questionModel.Question.findById(req.params.id, (err, foundQuestion) => {
		res.render('index.ejs', {
			currentUser: req.session.currentUser,
			pageToRender: "edit_question",
			currentQuestion: foundQuestion
		});
	})
});

teachers.get('/question/:id', (req, res) => {
	questionModel.Question.findById(req.params.id, (err, foundQuestion) => {
		examModel.Exam.find({
			owner_id: req.session.currentUser._id
		}, (err, foundExams) => {
			res.render('index.ejs', {
				currentUser: req.session.currentUser,
				pageToRender: "show_question",
				ownedExams: foundExams,
				currentQuestion: foundQuestion
			})
		})
	})
});

teachers.get('/question', (req, res) => {
	questionModel.Question.find({
		owner_id: req.session.currentUser._id
	}, (err, ownedQuestions) => {
		let ownedQuestionLimit = 5;
			if(ownedQuestionLimit>ownedQuestions.length){
				ownedQuestionLimit = ownedQuestions.length;
			}
			ownedQuestions = ownedQuestions.slice(ownedQuestions.length-ownedQuestionLimit)
		res.render('index.ejs', {
			currentUser: req.session.currentUser,
			ownedQuestions: ownedQuestions,
			pageToRender: "question"
		});
	})
});

teachers.post('/question/new', (req, res) => {
	req.body.owner_id = req.session.currentUser._id;
	req.body.correctAnswer = req.body.options[req.body.correctAnswerIndex];
	questionModel.Question.create(req.body, (err, createdQuestion) => {
		if (err) {
			console.log(err);
		} else {
			console.log(createdQuestion);
			res.redirect(`${createdQuestion._id}`);
		}
	});
});

teachers.post('/question', (req, res) => {
	userModel.User.find({}, (err, foundUsers) => {
		questionModel.Question.find({}, (err, foundQuestions) => {
			questionModel.Question.find({
				owner_id: req.session.currentUser._id
			}, (err, ownedQuestions) => {
				let ownedQuestionLimit = 5;
				if(ownedQuestionLimit>ownedQuestions.length){
					ownedQuestionLimit = ownedQuestions.length;
				}
				ownedQuestions = ownedQuestions.slice(ownedQuestions.length-ownedQuestionLimit)
				
				const searchResultQuestions = [];
				foundQuestions.forEach((foundQuestion) => {
					if (foundQuestion.content.toLowerCase().indexOf(req.body.searchKeyword.toLowerCase()) >= 0) {
						searchResultQuestions.push(foundQuestion);
					} else if (foundQuestion.correctAnswer.toLowerCase().indexOf(req.body.searchKeyword.toLowerCase()) >= 0) {
						searchResultQuestions.push(foundQuestion);
					} else if (typeof foundQuestion.tags != "undefined") {
						if (foundQuestion.tags.toLowerCase().indexOf(req.body.searchKeyword.toLowerCase()) >= 0) {
							searchResultQuestions.push(foundQuestion);
						}
					} 
				})

				searchResultQuestions.forEach((searchResult) => {
					foundUsers.forEach((foundUser) => {
						if(foundUser._id==searchResult.owner_id){
							searchResult.owner_name = `${foundUser.firstName} ${foundUser.lastName}`;
						}
					})
				})

				res.render('index.ejs', {
					currentUser: req.session.currentUser,
					ownedQuestions: ownedQuestions,
					searchResults: searchResultQuestions.reverse(),
					pageToRender: "question"
				});
			})
		})
	})
});

teachers.put('/question/edit/:id', (req, res) => {
	console.log(req.body.correctAnswerIndex)
	req.body.owner_id = req.session.currentUser._id;
	req.body.correctAnswer = req.body.options[req.body.correctAnswerIndex];
	questionModel.Question.findByIdAndUpdate(req.params.id, req.body, (err, createdQuestion) => {
		if (err) {
			console.log(err);
		} else {
			console.log(createdQuestion);
			res.redirect(`/teachers/question/${createdQuestion._id}`);
		}
	});
});

teachers.put('/exam/addQuestion/:id', (req, res) => {
	examModel.Exam.findByIdAndUpdate(req.body.targetExamId, {
		$addToSet: {
			questions_ids: req.params.id
		}
	}, {
		new: true
	}, (err, foundExam) => {
		if (err) {
			console.log(err);
		} else if (foundExam) {
			res.redirect(`/teachers/question`);
		}
	});
});

teachers.delete('/question/delete/:id', (req, res) => {
	questionModel.Question.findByIdAndRemove(req.params.id, (err, deletedQuestion) => {
		if (err) {
			console.log(err)
		} else {
			res.redirect('/teachers/question');
		}
	});
})

// Exam Routes
teachers.get('/exam/new', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "new_exam"
	});
});

teachers.get('/exam/:id', (req, res) => {
	examModel.Exam.findById(req.params.id, (err, foundExam) => {
		questionModel.Question.find({
			_id: {
				$in: foundExam.questions_ids
			}
		}, (err, foundQuestions) => {
			groupModel.Group.find({
				owner_id: req.session.currentUser._id
			}, (err, foundGroups) => {
				res.render('index.ejs', {
					currentUser: req.session.currentUser,
					pageToRender: "show_exam",
					currentExam: foundExam,
					ownedGroups: foundGroups,
					examQuestions: foundQuestions
				})
			})
		})
	})
});

teachers.get('/exam', (req, res) => {
	examModel.Exam.find({
		owner_id: req.session.currentUser._id
	}, (err, foundExams) => {
		console.log(foundExams);
		res.render('index.ejs', {
			currentUser: req.session.currentUser,
			ownedExams: foundExams,
			pageToRender: "exam"
		});
	})
});

teachers.post('/exam/new', (req, res) => {
	req.body.owner_id = req.session.currentUser._id;
	examModel.Exam.create(req.body, (err, createdExam) => {
		if (err) {
			console.log(err);
		} else {
			console.log(createdExam);
			res.redirect(`${createdExam._id}`);
		}
	});
});

teachers.put('/group/addExam/:id', (req, res) => {
	groupModel.Group.findByIdAndUpdate(req.body.targetGroupId, {
		$addToSet: {
			exams_ids: req.params.id
		}
	}, {
		new: true
	}, (err, foundGroup) => {
		if (err) {
			console.log(err);
		} else if (foundGroup) {
			res.redirect(`/teachers/exam/${req.params.id}`);
		}
	});
});

teachers.put('/group/:groupId/removeExam/:examId', (req, res) => {
	groupModel.Group.findByIdAndUpdate(req.params.groupId, {
		"$pull": {
			"exams_ids": req.params.examId
		}
	}, {
		new: true
	}, (err, updatedGroup) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect(`/teachers/group/${req.params.groupId}`);
		}
	})
});

teachers.delete('/exam/delete/:id', (req, res) => {
	examModel.Exam.findByIdAndRemove(req.params.id, (err, deletedGroup) => {
		if (err) {
			console.log(err)
		} else {
			res.redirect('/teachers/exam');
		}
	});
})

// Group Routes
teachers.get('/group/new', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser,
		pageToRender: "new_group"
	});
});

teachers.get('/group/:id', (req, res) => {
	groupModel.Group.findById(req.params.id, (err, foundGroup) => {
		userModel.User.find({
			_id: {
				$in: foundGroup.members_ids
			}
		}, (err, foundMembers) => {
			examModel.Exam.find({
				_id: {
					$in: foundGroup.exams_ids
				}
			}, (err, foundExams) => {
				res.render('index.ejs', {
					currentUser: req.session.currentUser,
					pageToRender: "show_group",
					currentGroup: foundGroup,
					groupExams: foundExams,
					groupMembers: foundMembers
				})
			})
		})
	})
});

teachers.get('/group', (req, res) => {
	groupModel.Group.find({
		owner_id: req.session.currentUser._id
	}, (err, foundGroups) => {
		console.log(foundGroups);
		res.render('index.ejs', {
			currentUser: req.session.currentUser,
			ownedGroups: foundGroups,
			pageToRender: "group"
		});
	})
});

teachers.post('/group/new', (req, res) => {
	// function for generating random key
	const makeid = (length) => {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}

	let newKey = makeid(8);
	let keySameCount = 0;
	let isUnique = false;

	groupModel.Group.find({}, (err, foundGroups) => {
		while (!isUnique) {
			foundGroups.forEach((foundGroup) => {
				if (foundGroup.join_key === newKey) {
					keySameCount++;
				}
			})
			if (keySameCount === 0) {
				isUnique = true;
			} else {
				keySameCount = 0;
				isUnique = false;
			}
		}
	})
	///////////////////////

	req.body.owner_id = req.session.currentUser._id;
	req.body.join_key = newKey;
	groupModel.Group.create(req.body, (err, createdGroup) => {
		if (err) {
			console.log(err);
		} else {
			console.log(createdGroup);
			res.redirect(`${createdGroup._id}`);
		}
	});
});

teachers.delete('/group/delete/:id', (req, res) => {
	groupModel.Group.findByIdAndRemove(req.params.id, (err, deletedGroup) => {
		if (err) {
			console.log(err)
		} else {
			res.redirect('/teachers/group');
		}
	});
})

// EXPORT
module.exports = teachers;