import Note from "./Note";

class NotesWall {
  constructor() {
    this.notes = []; // making an array of notes that will be removed and added
  }

  addNote(text) {
    const note = new Note(text);
    this.notes.push(note);
  }

 findNote(text) {
  const note = this.NotesWall.notes.find((n)=> n.text === text);
  if (note) {
    console.log("\n******** NOTE FOUND ********\n");
  }
  return note;
 }



  removeNote(text) {
    this.notes = this.notes.filter((note) => note.text !== text);
  }
}

export default NotesWall;
