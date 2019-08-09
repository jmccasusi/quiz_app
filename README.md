# SPHINX Quiz App

The SPHINX app is a tool that can be utilized by teachers in order to ease the process of creating and giving out exams to students.

[https://obscure-sea-29705.herokuapp.com](https://obscure-sea-29705.herokuapp.com)

![screenshot of page](screenshot-1.png 'Test screenshot1')
![screenshot of page](screenshot-2.png 'Test screenshot2')

## Features (Teachers)
- Allows the teacher to create a new group, generating a unique join key that they can give to their students in order to join
- Allows the teacher to create new exams, insert as many questions into them, and then assign the exam to a single group or multiple groups
- Gives the teacher the ability to create new questions to be added to the "Question Bank" and the ability to edit them
- Teachers can search through the "Question Bank" for all questions that other teachers have also created and then add them to their own created exams
- Automatically check submitted exams from the students, and gives the teacher an easy summary table to see the grades of each student per exam

## Features (Students)
- Allows the student to join a group, given they have the unique join key for it
- Gives the ability to the student user to take available exams inside the group
- Students can view their score as soon as they submit their exam, and also see the scores from previous exams as well

## Technologies
- HTML
- CSS / Bootstrap
- Javascript
- jQuery
- expressjs
- MongoDB / mongoose

## Future Improvements
- Better keyword search algorithm and/or tag system
- Sorting capability for search results in Question Bank
- Timer and scheduler for exams
- Preventive measures for cheating while taking exam
- Complete prompts for each action taken by users
- Home feed to be an announcement for incoming exams
- Basic user profiles and messaging
- Calendar for incoming events