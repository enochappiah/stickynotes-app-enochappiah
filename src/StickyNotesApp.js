import NotesWall from "./NotesWall.js";
class StickyNotesApp {
  constructor() {
    this.NotesWall = new NotesWall();
  }

  renderNotes() {
    const allNotes = this.NotesWall.notes;
    const notesWallElement = document.getElementById("notes-wall");
    notesWallElement.innerHTML = "";

    allNotes.forEach((note) => {

      //Note Element
      const noteElement = document.createElement("div"); //each individual note
      noteElement.className =
        "relative w-40 h-40 p-0 m-2 overflow-y-auto transition-transform transform bg-yellow-200 shadow-lg note hover:scale-105";
      noteElement.text = note.text;
      noteElement.id = note.id;

      //Delete-Btn Element
      const deleteElement = document.createElement("button");
      deleteElement.className =
        "absolute w-5 h-5 leading-5 text-center transition-opacity opacity-0 cursor-pointer delete-btn top-1 right-1 hover:opacity-100 ";
      //deleteElement.id = "delete-btn";
      deleteElement.innerHTML = "🗑";

      //Text Element
      const noteText = document.createElement("div"); // text in note
      noteText.className = "p-4 note-text"; //note-edit
      noteText.innerHTML = note.text.replace(/\n/g, "<br>"); //replaces all newlines with break elements

      //Edit element
      const noteTextArea = document.createElement("textarea"); // edit in note
      noteTextArea.className =
        "absolute top-0 left-0 hidden w-full h-full p-4 transition-transform transform bg-yellow-300 shadow-xl resize-none outline-rose-700 outline-offset-0 note-edit note hover:scale-105";
      noteTextArea.value = note.text;

      noteElement.appendChild(deleteElement);
      noteElement.appendChild(noteText);
      noteElement.appendChild(noteTextArea);
      notesWallElement.appendChild(noteElement);
    });
  }

  handleDoubleClick(event) {

    //finds and stores noteElement that user has double clicked
    const noteElement = event.target.closest(".note");

    if (noteElement) {
      //gets elements in notes
      const noteText = noteElement.querySelector(".note-text");
      const noteEdit = noteElement.querySelector(".note-edit");

      //removes hidden attribute to textarea and adds hidden to text for proper formatting of view
      noteEdit.classList.remove("hidden");
      noteText.classList.add("hidden");

      //allows user to directly start editing the textarea
      noteEdit.focus();
    }
  }

  saveNoteEdit(event) {
    //edits the note and returns the textarea elements to their previous setting and calls renderNotes
    this.NotesWall.editNote(event.target.parentElement.id, event.target.value);
    this.renderNotes();
  }

  handleNewNote(event) {
    if (
      event.key === "Enter" &&
      event.target.value.trim() !== "" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      this.NotesWall.addNote(event.target.value.trim());
      event.target.value = "";
      this.renderNotes();
    }
  }

  handleDeleteClick(event) {
    if (event.target.classList.contains("delete-btn")) {
      //if the user clicks the trash icon of a certain note, remove that note delete-btn
      const noteElement = event.target.parentElement;
      this.NotesWall.removeNote(noteElement);
      this.renderNotes();
    }
  }

  handleEditKeyDown(event) {
    //if the user completes entering in text to the textarea that is not a new line, 
    //blur/unfocus the textarea to signal saving the edit
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.target.blur();
    }
  }

  init() {
    document
      .getElementById("new-note")
      .addEventListener("keydown", this.handleNewNote.bind(this));

    document
      .getElementById("notes-wall")
      .addEventListener("blur", this.saveNoteEdit.bind(this), true); //triggers during capturing phase and stops at textarea
      //without it, the textarea/edit elements do not revert their attributes until render is called
      //and edits are not properly saved

    document
      .getElementById("notes-wall")
      .addEventListener("click", this.handleDeleteClick.bind(this));

    document
      .getElementById("notes-wall")
      .addEventListener("dblclick", this.handleDoubleClick.bind(this));

    document
      .getElementById("notes-wall")
      .addEventListener("keydown", this.handleEditKeyDown.bind(this));

    this.renderNotes();
  }
}

export default StickyNotesApp;
