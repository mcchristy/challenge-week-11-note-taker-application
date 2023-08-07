const express = require('express');
const fs = require('fs');
const path = require('path');
const { uuid } = require('uuidv4');

const router = express.Router();


// router.get('/notes', async (req, res) => {
//     try {
//       const notes = fs.readFileSync('../Develop/db/db.json', 'utf8');
//       res.json(JSON.parse(notes));
//     } catch (error) {
//       console.error('Error reading the database file:', error);
//       res.status(500).json({ error: 'Failed to retrieve notes.' });
//     }
//   });
router.get('/notes', async (req, res) => {
    try {
      const notesPath = path.join(__dirname, '../Develop/db/db.json');
      const notes = fs.readFileSync(notesPath, 'utf8');
      res.json(JSON.parse(notes));
    } catch (error) {
      console.error('Error reading the database file:', error);
      res.status(500).json({ error: 'Failed to retrieve notes.' });
    }
  });
  
  
  router.post('/notes', async (req, res) => {
    try {
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid(),
      };
  
      const notes = await JSON.parse(fs.readFileSync('../Develop/db/db.json'));
    
      notes.push(newNote);
  
      fs.writeFileSync('../Develop/db/db.json', JSON.stringify(notes));
      res.json(newNote);

    } catch (error) {
      console.error('Error saving the note:', error);
      res.status(500).json({ error: 'Failed to save note.' });
    }
  });
  
  router.delete('/notes/:id', async (req, res) => {
    try {
      const noteId = req.params.id;

      const notes = await JSON.parse(fs.readFileSync('../Develop/db/db.json'));

      const noteIndex = notes.findIndex((note) => note.id === noteId);
  
      if (noteIndex === -1) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      notes.splice(noteIndex, 1);
  
      fs.writeFileSync('../Develpo/db/db.json', JSON.stringify(notes));
  
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting the note:', err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;