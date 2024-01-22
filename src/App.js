import React, {Component} from 'react';
import './App.css';
import Note from './Note/Note';

class App extends Component {

  constructor() {
    super();
    this.state = {
      notes: [
        { noteId: 1, noteContent: 'note 1' },
        { noteId: 2, noteContent: 'note 2' }
      ]
    };
  }

  render() {

    return (
      <div className="notesContainer">

        <div className="notesHeader">
          <h1>React y Firebase App</h1>
        </div>

        <div className="notesBody">
          <ul>
            {
              this.state.notes.map(note => (
                <Note 
                noteContent={note.noteContent}
                noteId={note.noteId}
                key={note.noteId}
                />
              ))
            }
          </ul>
        </div>

        <div className="notesFooter">

        </div>

      </div>
    );
  }
}

export default App;

