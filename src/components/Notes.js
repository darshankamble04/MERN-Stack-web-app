import React, { useContext } from 'react'
import noteContext from "../context/noteContext"
import NoteItems from './NoteItems'

function Notes() {
    const context = useContext(noteContext)
    const { notes } = context
    return (
        <>
            <div className="container my-3">
                <h2>Your Notes</h2>
                <div className="rows">
                    {notes.map((note) => {
                        return <NoteItems key={note._id} notes={note} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
