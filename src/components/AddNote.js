import noteContext from "../context/notes/noteContext"
import React, { useContext, useState } from 'react'
import './Home.css'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert ? props.showAlert("Note Added Successfully", "success") : console.log("Note Added Successfully");
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            {/* Separate container for the heading */}
            <div className='heading-container'>
                <h3 className='form-heading'>Add a Note</h3>
            </div>

            <div className='container my-3'>
                <form className='custom-form'>
                    <div className='mb-3'>
                        <label htmlFor="title" className='form-label'>Title</label>
                        <input type="text" className='form-control' id="title" name="title" value={note.title} onChange={onchange} minLength={5} required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="description" className='form-label'>Description</label>
                        <input type="text" className='form-control' id="description" name="description" value={note.description} onChange={onchange} minLength={5} required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="tag" className='form-label'>Tag</label>
                        <input type="text" className='form-control' id="tag" name="tag" value={note.tag} onChange={onchange} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className='btn btn-primary' onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote;
