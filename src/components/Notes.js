import noteContext from "../context/notes/noteContext";
import React, { useContext, useEffect, useRef, useState } from 'react';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useHistory } from 'react-router-dom';
import './Note Js.css';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            history.push("/login");
        }
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

    const handleClick = (e) => {
        console.log("Updating the Note...", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert ? props.showAlert("Note Updated Successfully", "success") : console.log("Note Updated Successfully");
    };

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='custom-form'>
                                <div className='mb-3'>
                                    <label htmlFor="title" className='form-label'>Title</label>
                                    <input type="text" className='form-control' id="etitle" name="etitle" value={note.etitle} onChange={onchange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="desc" className='form-label'>Description</label>
                                    <input type="text" className='form-control' id="edescription" name="edescription" value={note.edescription} onChange={onchange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="tag" className='form-label'>Tag</label>
                                    <input type="text" className='form-control' id="etag" name="etag" value={note.etag} onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Container for the heading to style it separately */}
            <div className='heading-container'>
                <h3 className='notes-heading'>Your Notes</h3>
            </div>

            <div className='container my-3'>
                <div className="container">
                    {notes.length === 0 && 'No notes to Display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                })}
            </div>
        </>
    );
};

export default Notes;
