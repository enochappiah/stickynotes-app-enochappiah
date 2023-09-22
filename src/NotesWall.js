import Note from "./Note";

class NotesWall {
  constructor() {
    this.notes = []; // making an array of notes that will be removed and added
  }

  addNote(text) {
    const note = new Note(text);
    this.notes.push(note);
  }

  findNote(id) {
    const note = this.notes.find((note) => note.id === parseInt(id, 10));
    if (note) {
      return note;
    }
  }

  editNote(noteId, newText) {
    const note = this.notes.find((n) => n.id === parseInt(noteId, 10));
    if (note) {
      note.text = newText;
    }
  }
  removeNote(noteElement) {
    this.notes = this.notes.filter(
      (note) => note.id !== parseInt(noteElement.id),
    );
  }
}

export default NotesWall;
