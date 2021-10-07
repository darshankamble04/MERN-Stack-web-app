import React, { useContext ,useState } from 'react'
import noteContext from "../context/noteContext"
import Notes from "./Notes"

function Home() {
    const context = useContext(noteContext)
    const { notes, addNote, deleteNote, editNote } = context
    const [noteVal, setNoteVal] = useState({title:'',description:'',tag:'General'})
    const handleChange =(e)=>{
        setNoteVal({...noteVal,[ e.target.name] : e.target.value})
        console.log(noteVal)

    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("Note is added!",e.target)
        addNote(noteVal)
    }
    
    
    return (
        <div>
            <div className="container my-3">
                <h2>Welcome to iNotebook</h2>
            </div>
            <form className="container">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" name="title" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" >description</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" name="description" onChange={handleChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">General</label>
                </div>
                <button type="submit" className="btn btn-primary btn-sm" onClick={handleSubmit}>Add Note</button>
            </form>
            <Notes />
        </div>
    )
}

export default Home
