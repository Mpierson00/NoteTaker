const fs = require('fs');
const path = require('path');
const notes = require('../db/db.json');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        res.json(notes);
    });

    app.post('/api/notes', (req, res) => {
        const newNote = { ...req.body, id: Math.random().toString() };
        notes.push(newNote);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));
        res.json(newNote);
    });

    app.delete('/api/notes/:id', (req, res) => {
        const updatedNotes = notes.filter(note => note.id !== req.params.id);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(updatedNotes))
    });
};