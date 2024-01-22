import React, {Component} from "react";
import './Note.css';

class Note extends Component {
    constructor(props) {
        super(props);
        this.noteId = props.noteId;
        this.noteContent = props.noteContent;
        }
        render() { 
            return (
            <div className="Note">
                <li>{this.noteId} - {this.noteContent}</li>
            </div>

            )
         }
    }

    export default Note;