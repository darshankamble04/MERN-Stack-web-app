import React, { useContext ,useState } from 'react'
import noteContext from "../context/noteContext"
import Notes from "./Notes"

function Home() {
    const context = useContext(noteContext)
    const {addNote} = context
    const [noteVal, setNoteVal] = useState({title:'',description:'',tag:''})
    const handleChange =(e)=>{
        setNoteVal({...noteVal,[ e.target.name] : e.target.value})
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        addNote(noteVal)
        setNoteVal({title:'',description:'',tag:''})

    }
    
    
    return (
        <div>
            <div className="container my-3">
                <h2>Welcome to iNotebook</h2>
            </div>
            <form className="container">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" name="title" value={noteVal.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" >Description</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" name="description" value={noteVal.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" >Tag</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" name="tag" value={noteVal.tag} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-sm" onClick={handleSubmit}>Add Note</button>
            </form>
            <Notes />
        </div>
    )
}

export default Home
