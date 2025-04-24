import React, { useContext, useEffect, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal and button components

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, deleteNote } = context;

    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [noteToDelete, setNoteToDelete] = useState(null); // State to store the note ID to be deleted

    // Fetch notes when the component mounts
    useEffect(() => {
        getNotes();
    }, []);

    // Function to handle opening the modal and setting the note to delete
    const handleShowModal = (noteId) => {
        setNoteToDelete(noteId); // Set the note ID when the delete icon is clicked
        setShowModal(true); // Show the modal
    };

    // Function to handle note deletion after confirmation
    const handleDelete = () => {
        deleteNote(noteToDelete);  // Call the backend delete function
        props.showAlert("Note Deleted Successfully", "success");
        setShowModal(false); // Close the modal after deleting
    };

    return (
        <>
            <div className="row my-3">
                {/* Loop through notes and render each note */}
                {notes.map((note) => {
                    return (
                        <div className='col-md-3' key={note._id}>
                            <div className="card my-2">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title">{note.title}</h5>
                                        {/* Trash icon to open modal */}
                                        <i className="fa-solid fa-trash mx-3" onClick={() => handleShowModal(note._id)}></i>
                                        {/* Edit icon to update the note */}
                                        <i className="fa-solid fa-pen-to-square" onClick={() => props.updateNote(note)}></i>
                                    </div>
                                    <p className="card-text">{note.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bootstrap Modal for deletion confirmation */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this note?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Notes;
