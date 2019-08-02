// Dependencies
const express = require('express');
const mongoose = require ('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const app = express ();

// Port
const PORT = process.env.PORT || 3000;

// Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/QUIZAPPDB'

// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
	console.log('connected to mongo database')
});

// Middelwares
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
	session({
		secret: 'sphinx',
		resave: false,
		saveUninitialized: false
	})
);
app.use(express.static('public'))

// Controllers
const studentsController = require('./controllers/students.js');
const teachersController = require('./controllers/teachers.js');
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);
app.use('/students', studentsController);
app.use('/teachers', teachersController);

// Routes
app.get('/' , (req, res) => {
  res.render('index.ejs', {
      classification: "teachers",
      pageToRender: "home"
  });
});

// Listener
app.listen(PORT, () => console.log('Listening on port:', PORT));