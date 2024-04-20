const fs = require('fs');
const path = require('path');
const notes = require('../db/db.json');

module.exports = (app) => {
    // GET route to get the notes
    app.get('/api/notes', (req, res) => {
        res.json(notes);
    });

    //POST route to create a new note
    app.post('/api/notes', (req, res) => {
        const newNote = { ...req.body, id: Math.random(36).toString(2, 9) };
        notes.push(newNote);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));
        res.json(newNote);
    });

    // Delete route for deleteing a note by ID
    app.delete('/api/notes/:id', (req, res) => {
        const updatedNotes = notes.filter(note => note.id !== req.params.id);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(updatedNotes));
        res.json({ ok: true });
    });
};