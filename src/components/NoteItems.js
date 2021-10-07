import React, { useContext ,useState } from 'react'
import noteContext from "../context/noteContext"

function NoteItems(props) {
    const context = useContext(noteContext)
    const { notes, addNote, deleteNote, editNote } = context
    const handleDelete = (id) =>{
        console.log(`note was deleted of ${id}`)
        deleteNote(id)
    }
    return (
        <div className="card col-md-5 my-3 mx-2 d-inline-flex">
            <div className="card-body">
                <div className="d-inline-flex align-items-center">
                    <h5 className="card-title ">{props.notes.title}</h5>
                    <i className="fas fa-trash-alt mx-3" onClick={()=>{return handleDelete(props.notes._id)}}></i>
                    <i className="fas fa-edit"></i>
                </div>
                <p className="card-text">{props.notes.description}</p>
            </div>
        </div>
    )
}

export default NoteItems
