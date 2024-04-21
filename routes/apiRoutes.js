const fs = require('fs');
const path = require('path');

function getNotes() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
}

module.exports = (app) => {
    // GET route to get the notes
    app.get('/api/notes', (req, res) => {
        res.json(notes);
    });

    //POST route to create a new note
    app.post('/api/notes', (req, res) => {
        const notes = getNotes();
        const newNote = { 
            ...req.body, 
            id: Math.random().toString(36).substr(2, 9)
         };
        notes.push(newNote);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));
        res.json(newNote);
    });

    // Delete route for deleteing a note by ID
    app.delete('/api/notes/:id', (req, res) => {
        const id = req.params.id;
        let notes = getNotes();
        const filteredNotes = notes.filter(note => note.id !== id);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(filteredNotes));
        res.json({ success: true, msg: 'Note deleted' });
    });
};