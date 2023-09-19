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
      noteElement.show = true;
      noteElement.text = note.text;
      
      
      //Delete-Btn Element
        const deleteElement = document.createElement("button");
      deleteElement.className =
        "absolute w-5 h-5 leading-5 text-center transition-opacity opacity-0 cursor-pointer delete-btn top-1 right-1 hover:opacity-100 ";
      //deleteElement.id = "delete-btn";
      deleteElement.innerHTML = "🗑";
      
      
      //Text Element
      const noteText = document.createElement("div"); // text in note
      noteText.className = "p-4 note-text"; //note-edit
      noteText.textContent = note.text;


      //Edit element
      const noteTextArea = document.createElement("textarea"); // edit in note
      noteTextArea.className =
        "absolute top-0 left-0 hidden w-full h-full p-4 transition-transform transform bg-yellow-300 shadow-xl resize-none outline-rose-700 outline-offset-0 note-edit note hover:scale-105";
      noteTextArea.textContent = note.text;

      
      noteElement.appendChild(deleteElement);
      noteElement.appendChild(noteText);
      noteElement.appendChild(noteTextArea);
      notesWallElement.appendChild(noteElement);
    });
  } 

  
  handleNewNote(event) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      event.preventDefault();
      this.NotesWall.addNote(event.target.value.trim());
      event.target.value = ""; 
      this.displayNotes();
      //console.log("\nTHIS IS CORRECT!\n");
    } 
    //else if (event.shiftKey && event.key === "Enter") {
    //   event.target.value += "\n";
    // }
  }

  handleDeleteClick(event) {
    if (event.target.classList.contains("delete-btn")) { //if the user clicks the trash icon of a certain note, remove that note delete-btn
      this.NotesWall.removeNote(event.target.parentElement.text);
      this.displayNotes();
    }
  }

  handleEditClick(event) {
    this.handleDeleteClick;
  }

  handleMultiLine() {}

  init() {
    document
      .getElementById("new-note")
      .addEventListener("keydown", this.handleNewNote.bind(this));
  
    /*.bind(this) - changes execution context
      'this' is called by eventListener... so the execution contexts changes 
      but you want it to refer to the class object, so you bind it to this

      You can also change the function call in add.eventListener so that the function
      is now an arrow function and you dont need to .bind(this)

      but because right now it is not an arrow function and in the function it calls
      'this', you must make sure to use .bind(this) to make sure the execution context 
      is right and the this refers to the class object
      */
    document
      .getElementById("notes-wall")
      .addEventListener("click", this.handleDeleteClick.bind(this));

   

    // document
    //   .getElementById("notes-wall")
    //   .addEventListener("click", this.handleDeleteClick.bind(this));

    // document
    //   .getElementById("todo-nav")
    //   .addEventListener("click", this.handleFilterClick.bind(this));
    // document
    //   .getElementById("mark-all-completed")
    //   .addEventListener("click", this.handleMarkAllCompletedClick.bind(this));
    // document
    //   .getElementById("clear-completed")
    //   .addEventListener("click", this.handleClearCompletedClick.bind(this));

    this.displayNotes();
  }
}

export default StickyNotesApp;

// DELETE ICON 🗑
