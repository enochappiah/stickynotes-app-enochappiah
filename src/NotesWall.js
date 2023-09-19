import Note from "./Note";

class NotesWall {
  constructor() {
    this.notes = []; // making an array of notes that will be removed and added
  }

  addNote(text) {
    const note = new Note(text);
    this.notes.push(note);
  }

  // addNote(text) {
  //   this.notes.push({
  //     text: text,
  //     show: true
  //   });
  // }

  removeNote(text) {
    this.notes = this.notes.filter((note) => note.text !== text);
  }
}

export default NotesWall;
