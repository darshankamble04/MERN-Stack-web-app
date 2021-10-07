import React ,{useState} from 'react'
import NoteContext from './noteContext'

function NoteState(props) {
    const initialNotes = [
        {
            "_id": "615d869f03747c85aa",
            "user": "615c3ae282fc9faec0ea0475",
            "title": "this is title 2",
            "description": "this is description 2",
            "__v": 0
        },
        {
            "_id": "615d870533c02c7434cf07c",
            "user": "615c3ae282fc9faec0ea0475",
            "title": "this is title",
            "description": "this is description",
            "__v": 0
        },
        {
            "_id": "615d8696c7cf07c855aa",
            "user": "615c3ae282fc9faec0ea0475",
            "title": "this is title 2",
            "description": "this is description 2",
            "__v": 0
        },
        {
            "_id": "615d870533c02c723cf85ac",
            "user": "615c3ae282fc9faec0ea0475",
            "title": "this is title",
            "description": "this is description",
            "__v": 0
        },
        {
            "_id": "615d869633c02c7cf533aa",
            "user": "615c3ae282fc9faec0ea0475",
            "title": "this is title 2",
            "description": "this is description 2",
            "__v": 0
        },
        {
            "_id": "615d870533c02c7cf085aec",
            "user": "615c3ae282fc9faec0ea0475",
            "title": "this is title",
            "description": "this is description",
            "__v": 0
        },
        {
            "_id": "615d87063q4f07c85sae",
            "user": "615c3ae282fc9faec0ea0475",
            "title": "this is title 2",
            "description": "this is description 2",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(initialNotes)

    // ADD NOTE
    const addNote=(e)=>{
        const {title,description,tag}= e;
        const newNote = {
            "_id": "615d8706fdf33c02s85sae",
            "user": "615c3ae282fc9faec0ea0475",
            "title": title,
            "description":description,
            "__v": 0
        }
        setNotes(notes.concat(newNote))
    }
    // DELETE NOTE
    const deleteNote=(id)=>{
        const updatedNotes = notes.filter((e)=>{return e._id === id})
        setNotes(updatedNotes)
    }
    // EDIT NOTE
    const editNote=()=>{

    }
    
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;