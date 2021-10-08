import React, { useState } from 'react'
import NoteContext from './noteContext'

function NoteState(props) {
    const host = "http://localhost:5000";
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)
    const [noteVal, setNoteVal] = useState({ eid: '', etitle: '', edescription: '', etag: '' })

    // GET NOTE :~
    // API
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
        })
        const json = await response.json()
        setNotes(json)
    }

    // ADD NOTE :~
    const addNote = async (e) => {
        const { title, description, tag } = e;

        // API
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        })
        const json = await response.json()
        setNotes(notes.concat(json))
    }

    // DELETE NOTE  :~
    const deleteNote = async (id) => {
        // API
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
        })

        // CLIENT SIDE SCRIPTING
        const updatedNotes = notes.filter((e) => { return e._id !== id })
        setNotes(updatedNotes)
    }

    // EDIT NOTE  :~
    const [editNoteVal, setEditNoteVal] = useState({ title: '', description: '', tag: '' })
    const editNote = async (updatedNote) => {
        let { eid, etitle, edescription, etag } = updatedNote
        // CLIENT SIDE SCRIPTING
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            if (note._id === eid) {
                note.title = etitle;
                note.description = edescription;
                note.tag = etag;
            }
        }

        setEditNoteVal({ title: etitle, description: edescription, tag: etag })
        // API
        await fetch(`${host}/api/notes/updatenote/${eid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title: etitle, description: edescription, tag: etag }),
        })

    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, setEditNoteVal, editNoteVal, noteVal, setNoteVal }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;