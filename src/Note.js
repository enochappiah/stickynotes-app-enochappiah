class Note {
  static nextId = 1;
  constructor(text) {
    this.text = text;
    this.id = Note.nextId++;
  }
}

export default Note;
