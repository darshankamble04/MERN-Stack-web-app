import React, { useContext,useRef} from 'react'
import noteContext from "../context/noteContext"

function NoteItems(props) {
    const { _id} = props.notes
    const context = useContext(noteContext)
    const { notes, deleteNote, editNote,noteVal, setNoteVal } = context

    // FUNC TO DELETE NOTE :~
    const handleDelete = (id) => {
        deleteNote(id)
    }

    const handleChange = (e) => {
        setNoteVal({...noteVal,[ e.target.name] : e.target.value})
        
    }
    const handleEdit = (id) => {
        const filteredNote = notes.filter((e)=>{ return e._id === id })
        filteredNote.map((e)=>{
            return setNoteVal({eid:e._id, etitle: e.title, edescription: e.description, etag: e.tag})
        })
    }
    const handleSubmit = (e) => {
        editNote(noteVal)
        e.preventDefault()
        closeRef.current.click()

    }
    const closeRef = useRef(null)
    return (
        <div className="card col-md-5 my-3 mx-2 d-inline-flex">
            <div className="card-body">
                <div className="d-inline-flex align-items-center">
                    <h5 className="card-title ">{props.notes.title}</h5>
                    <i className="fas fa-trash-alt mx-3" onClick={() => { handleDelete(_id) }}></i>
                    <i className="fas fa-edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handleEdit(_id) }}></i>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" ref={closeRef} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form className="container">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" name="etitle" value={noteVal.etitle} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label" >Description</label>
                                            <input type="text" className="form-control" id="exampleInputPassword1" name="edescription" value={noteVal.edescription} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label" >Tag</label>
                                            <input type="text" className="form-control" id="exampleInputPassword1" name="etag" value={noteVal.etag} onChange={handleChange} />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <p className="card-text">{props.notes.description}</p>
            </div>
        </div>
    )
}

export default NoteItems
