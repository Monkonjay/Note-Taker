// dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
let notes = require('./db/db.json');

// middleware for public folder
app.use(express.static('public'));

// body parser
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// assigned port for local host
const PORT = process.env.PORT || 3001;


// get route returning index.html
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });


// get route returning notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


// get routes for returning all notes.
app.get('/api/notes', (req, res) => {
res.json(notes);
});


// POST route for /api/routes to create a new note.
app.post('/api/notes', (req,res) => {
req.body.id = Math.floor(Math.random() * 1000000);
notes.push(req.body);
fs.writeFileSync('./db/db.json', JSON.stringify(notes));
res.json(notes); 
});

// Delete route for individual notes
app.delete('/api/notes/:id' , (req,res) => {
  console.log("server noteID",req.params.id);

  for(let noteIndex = 0; noteIndex < notes.length; noteIndex ++) { 
    if(notes[noteIndex].id == req.params.id) {
      notes.splice(noteIndex,1);
      fs.writeFileSync('./db/db.json', JSON.stringify(notes));
      res.json(notes);
      break;
    }
  }  
});

// server listening 
app.listen(PORT, () => {
  console.log(`Server listening for request on port ${PORT}`)
});