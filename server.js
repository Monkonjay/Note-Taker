const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
let notes = require('./db/db.json');


// middleware for public folder
app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({extended : true}));


const PORT = 3001;

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



// // Delete note with the given id
// app.delete('/api/notes/:id' , (req,res) => {

//   for(let i = 0; i < notes.length; i ++) { 
//     if(notes[i].id === req.body.id) {
//       notes.splice(notes.indexOf(req.body.id,1));
//     }

//   }  
// });


// Delete note with the given id
app.delete('/api/notes/:id' , (req,res) => {

  for(let i = 0; i < notes.length; i ++) { 
    if(notes[i].id === req.params.id) {
      notes.splice(notes.indexOf(req.params.id),1);
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