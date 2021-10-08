import React, { useContext,useEffect } from 'react'
import noteContext from "../context/noteContext"
import NoteItems from './NoteItems'

function Notes() {
    const context = useContext(noteContext)
    const { notes ,getNotes} = context
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="container my-3">
                <h2>Your Notes</h2>
                <div className="rows">
                    {notes.length === 0 && "No Notes to display "}
                    {notes.map((note) => {
                        return <NoteItems key={note._id} notes={note} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
