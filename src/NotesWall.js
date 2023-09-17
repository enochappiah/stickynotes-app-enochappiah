import Note from "./Note";

class NotesWall {
  constructor() {
    this.notes = []; // making an array of notes that will be removed and added
  }

  addNote(text) {
    const note = new Note(text);
    this.notes.push(note);
  }

  removeNote() {
    this.notes = this.notes.filter((note) => !note.show); //will remove note from notes array when called
  }
}

export default NotesWall;
