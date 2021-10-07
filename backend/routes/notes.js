const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes")
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');


// ROUTE:1 Get all the notes using : GET ("./api/note/fetchallnotes") No login required
router.get('/fetchallnotes', fetchuser, async(req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    };
})

// ROUTE:2 Add a new Notes using : POST ("./api/note/addnote") No login required
router.post('/addnote', fetchuser, [
    body('title', "Enter a title which contain at least 3 charactors").isLength({ min: 3 }),
    body('description', 'Enter a title which contain at least 5 charactors').isLength({ min: 5 })
], async(req, res) => {

    try {
        const { title, description, tag } = req.body
            // Any errors return Bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
        const saveNotes = await notes.save()
        res.json(saveNotes)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    };

})

// ROUTE:3 Update the exiting Notes using : PUT ("./api/note/updatenote") No login required
router.put('/updatenote/:id', fetchuser, async(req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create newNote object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);

        // For security 
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    };
})

// ROUTE:4 Delete the exiting Notes using : DELETE ("./api/note/deletenote") No login required
router.delete('/deletenote/:id', fetchuser, async(req, res) => {
    try {
        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);

        // For security 
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Your note is successfully deleted!!", "note": note })
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    };
})

module.exports = router;