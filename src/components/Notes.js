import React, { useContext, useEffect, useRef,useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Notes = (props) => {
  const history = useHistory();
  const context = useContext(NoteContext);
  const {addNote, editNote, notes, setNotes, fetchNotes} = context;
  const {showAlert} = props;


  // fetchnotes will run only one time when reloaded
  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNotes();
    }
    else{
      history.push("/login");
    }
  }, []);

  const ref = useRef(null);
  // Using ref to close the edit modal
  const refClose = useRef(null);

  // Use to update the note
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  };

  // Use to set the notes with new edited values
  const [note, setNote] = useState({id: "",etitle: "", edescription:"", etag:"default"});

  const handleclick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    props.showAlert("Note Updated Successfully", "success");
    refClose.current.click();
  }

  const onChange=(e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}

  return (
    <div>
      <Addnote showAlert={showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form className="my-3">
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.etitle}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            onChange={onChange}
            value={note.edescription}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            onChange={onChange}
            value={note.etag}
          />
        </div>
      </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleclick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length===0 && "No Notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert}/>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
