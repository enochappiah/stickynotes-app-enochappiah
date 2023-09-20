import Note from "./Note";

class NotesWall {
  constructor() {
    this.notes = []; // making an array of notes that will be removed and added
    //this.idCounter = 0;
  }

  addNote(text) {
    const note = new Note(text);
    this.notes.push(note);
    //console.log(note.id);
  }
  
 findNote(id) {
  const note = this.notes.find((note)=> note.id == id);
  if (note) {
    return note;
  }
 }

  removeNote(noteElement) {
  this.notes = this.notes.filter((note) => note.id != noteElement.id);
  }
}

export default NotesWall;
