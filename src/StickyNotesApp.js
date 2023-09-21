import NotesWall from "./NotesWall.js";
class StickyNotesApp {
  constructor() {
    this.NotesWall = new NotesWall();
  }

  //textarea class for note text
  //notes-wall id for all notes
  // p-4 note-text class for all notes
  displayNotes() {
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
      noteText.innerHTML = note.text.replace(/\n/g, "<br>");

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

  handleNewNote(event) {
    if (event.key === "Enter" && event.target.value.trim() !== "" && !event.shiftKey) {
      event.preventDefault();
      this.NotesWall.addNote(event.target.value.trim());
      event.target.value = "";
      this.displayNotes();
    }
  }

  handleDeleteClick(event) {
    if (event.target.classList.contains("delete-btn")) {
      //if the user clicks the trash icon of a certain note, remove that note delete-btn
      const noteElement = event.target.parentElement;
      this.NotesWall.removeNote(noteElement);
      this.displayNotes();
    }
  }


  handleSaveClick(event) {
    const noteEdit = document.querySelector(".note-edit:not(.hidden)");
    const clickedElement = event.target;


    if (noteEdit && !noteEdit.contains(clickedElement)) {
      const noteElement = noteEdit.parentElement;
      const noteText = noteElement.querySelector(".note-text");
      const note = this.NotesWall.findNote(noteElement.id);
      note.text = noteEdit.value.trim();
      noteEdit.classList.add("hidden");
      noteText.classList.remove("hidden");
      this.displayNotes();
    }
  }

  handleEditKey(event) {
    // if (event.key === "Enter" ) { //&& !event.shiftKey


    //   if (!event.shiftKey) {
    //   //console.log(event.target);
    //   const noteText = event.target.parentElement.querySelector(".note-text");
    //   const noteEdit = event.target.parentElement.querySelector(".note-edit");
    //   event.preventDefault();

    //   //gets you the appropiate note from notes array that is being edited by user
    //   const note = this.NotesWall.findNote(event.target.parentElement.id);
    //   if (note) {
    //   note.text = event.target.value.trim();
    //   noteEdit.classList.add("hidden");
    //   noteText.classList.remove("hidden");
    //   }
      
    //   this.displayNotes();
      
    
    //   } else if (event.shiftKey && event.key === "Enter") {
    //     console.log("ENTERED SHIFT STATEMENT");
    //     event.preventDefault();
    //     console.log(event.target);
    //     console.log(event.target.value);


    //   event.target.value += "\n";
    //   console.log(event.target.value);
    //   const note = this.NotesWall.findNote(event.target.parentElement.id);
    //   if (note) {
    //     note.text = event.target.value.trim();
    //     // noteEdit.classList.add("hidden");
    //     // noteText.classList.remove("hidden");
    //   }

    //   }
    // }

    //event.key === "Enter" && !event.shiftKey && (event.preventDefault(), event.target.blur());
    if (event.key === "Enter" && !event.shiftKey ) {
      event.preventDefault();
      event.target.blur();
    }
  }

  handleNewEdit(event) {
    // if (event.shiftKey && event.key === "Enter") {
    //   console.log("ENTERED SHIFT STATEMENT");
    //   event.preventDefault();
    //   console.log(event.target);
    //   console.log(event.target.value);

    //   event.target.value += "\n";
    //   console.log(event.target.value);



    // }

    const note = this.NotesWall.findNote(event.target.parentElement.id);
      if (note) {
        note.text = event.target.value;
      }
    this.displayNotes();
  }

  handleDoubleClick(event) {
    // if (event.target.classList.contains("note")) {
    //   const noteText = event.target.parentElement.querySelector(".note-text"); //TODO remove
    //   const noteEdit = event.target.querySelector(".note-edit");
    //   noteEdit.classList.remove("hidden");
    //   noteEdit.focus();

    //   document.addEventListener("keydown", this.handleEditKey.bind(this));
    //   document.addEventListener("click", this.handleSaveClick.bind(this));
    //   //document.addEventListener("")

    //   //document.removeEventListener("keydown", this.handleEditKey.bind(this));
    
    // }

    const noteElement = event.target.closest(".note"); 
    
    //if (note element) 

      const noteText = noteElement.querySelector(".note-text"); 
      const noteEdit = noteElement.querySelector(".note-edit");
      const deleteBtn = noteElement.querySelector(".delete-btn");

      noteEdit.classList.remove("hidden");
      noteText.classList.add("hidden");
      deleteBtn.classList.add("hidden");
      noteEdit.focus();

  }

  init() {
    document
      .getElementById("new-note")
      .addEventListener("keydown", this.handleNewNote.bind(this));

    document
      .getElementById("notes-wall")
      .addEventListener("click", this.handleDeleteClick.bind(this));

    document
      .getElementById("notes-wall")
      .addEventListener("dblclick", this.handleDoubleClick.bind(this));

    document
      .getElementById("notes-wall")
      .addEventListener("keydown", this.handleEditKey.bind(this));

    // document
    //   .getElementById("new-note")
    //   .addEventListener("keydown", )


    document
      .getElementById("notes-wall")
      .addEventListener("blur", this.handleNewEdit.bind(this));

    this.displayNotes();
  }
}

export default StickyNotesApp;

// DELETE ICON 🗑
