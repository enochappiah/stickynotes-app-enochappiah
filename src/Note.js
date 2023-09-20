class Note {
  static nextId = 1;
  constructor(text) {
    this.text = text;
    this.show = true; //to delete & remove from array
    this.id = Note.nextId++;
  }

  edit(newText) {
    //to edit notes
    this.text = newText;
  }

}

export default Note;
