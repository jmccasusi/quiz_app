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
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
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
app.use(sessionsController);
app.use('/students', studentsController);
app.use('/teachers', teachersController);

// Routes
app.get('/' , (req, res) => {
    if(req.session.currentUser){
        if(req.session.currentUser.classification==="students"){
            res.redirect('/students');
        } else {
            res.redirect('/teachers');
        }
    } else {
        res.render('index.ejs', {
            currentUser: {classification: "strangers"},
            pageToRender: "home"
        });
    }
});

// Listener
app.listen(PORT, () => console.log('Listening on port:', PORT));