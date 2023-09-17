class Note {
  constructor(text) {
    this.text = text;
    //this.show = show; //to delete & remove from array
  }

  edit(newText) {
    //to edit notes
    this.text = newText;
  }

  toggle() {
    //to delete notes
    this.show = !this.show;
  }
}

export default Note;
