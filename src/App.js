import React, { Component } from 'react';
import './App.css';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';

// import firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, onChildAdded, onChildRemoved, push, set } from 'firebase/database';
import { DB_CONFIG } from './config/config';
import 'firebase/database';

class App extends Component {

  constructor() {
    super();
    this.state = {
      notes: [
        // { noteId: 1, noteContent: 'note 1' },
        // { noteId: 2, noteContent: 'note 2' }
      ]
    };
    this.app = initializeApp(DB_CONFIG);
    this.db = getDatabase(this.app);

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentDidMount() {
    const { notes } = this.state;
    const notesRef = ref(this.db, 'notes');

    onChildAdded(notesRef, snap => {
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      })
      this.setState({ notes })
    })

    onChildRemoved(notesRef, snap => {
      const updatedNotes = notes.filter(note => note.noteId !== snap.key);
      this.setState({ notes: updatedNotes });
    });

  }

  removeNote(noteId) {
    const noteRef = ref(this.db, `notes/${noteId}`);
    set(noteRef, null);
  }
  

  addNote(note) {

    const notesRef = ref(this.db, 'notes');
    const newNoteRef = push(notesRef);

    set(newNoteRef, {
      noteId: newNoteRef.key,
      noteContent: note
    });
  }

  render() {

    return (
      <div className="notesContainer">

        <div className="notesHeader">
          <h1>App de Notas React y Firebase</h1>
          <br />
          <h2> Tomas Pennisi Moreira</h2>
        </div>

        <div className="notesBody">
          <ul>
            {
              this.state.notes.map(note => (
                <Note
                  noteContent={note.noteContent}
                  noteId={note.noteId}
                  key={note.noteId}
                  removeNote={this.removeNote}
                />
              ))
            }
          </ul>
        </div>

        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>

      </div>
    );
  }
}

export default App;

