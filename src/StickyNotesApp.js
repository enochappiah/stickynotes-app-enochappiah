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

      //console.log(allNotes);
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
    if (event.target.classList.contains("delete-btn")) {
      //if the user clicks the trash icon of a certain note, remove that note delete-btn
      const noteElement = event.target.parentElement;
      this.NotesWall.removeNote(noteElement);
      this.displayNotes();
    }
  }

  handleInputClicks(event){

  }

  handleSaveClick(event) {
    const noteEdit = document.querySelector(".note-edit:not(.hidden)");
    const noteText = event.target.parentElement.querySelector(".note-text");

    const clickedElement = event.target;
    if (noteEdit && !noteEdit.contains(clickedElement)) { //or clickedElement != noteEdit
      console.log("YAY!");
      const noteElement = noteEdit.parentElement;
      const note = this.NotesWall.findNote(noteElement.id);
      //console.log(clickedElement);
      note.text = noteEdit.value.trim();
      noteEdit.classList.add("hidden");
      noteText.classList.remove("hidden");
      this.displayNotes();

      
    }

    // const noteInEdit = document.querySelector(".note-edit:not(.hidden)");
    // if (noteInEdit && !noteInEdit.contains(event.target)) {
    //   console.log("YAY!");
    //   const noteElement = noteInEdit.parentElement;
    //   const noteId = noteInEdit.parentElement.id; //getAttribute('id)

      
    // }
  }

  handleSaveKey(event) {

  }

  handleEditKey(event) {

    if (event.key === "Enter" && !event.shiftKey) {
      console.log(event.target);
      const noteText = event.target.parentElement.querySelector(".note-text");
      const noteEdit = event.target.parentElement.querySelector(".note-edit");
      //event.preventDefault();
      //gets you the appropiate note from notes array that is being edited by user
      const note = this.NotesWall.findNote(event.target.parentElement.id);
      note.text = event.target.value.trim();
      noteEdit.classList.add("hidden");
      noteText.classList.remove("hidden");
      this.displayNotes();

    }

    

    // if(event.target.classList.contains("note")) {
    //   console.log("\n******** PRINT ********\n");
    
    //   console.log(event.target);
    //   const noteEdit = event.target.querySelector(".note-edit");
    //   const noteText = event.target.querySelector(".note-text");
    //   noteEdit.classList.remove("hidden");
    //   noteEdit.autofocus = true;

    //   if (event.key === "Enter" && event.target.value.trim() != "") {
    //     console.log("\n******** PRINT ********\n");
    //     noteEdit.classList.remove("hidden");
    //     noteEdit.autofocus = true;
    //     event.preventDefault();
    //     const editingNote = this.NotesWall.findNote(event.target.parentElement.id);
    //     const newText = event.target.value.trim();
    //     editingNote.text = newText;
    //     const noteEdit = event.target.querySelector(".note-edit");
    //     const noteText = event.target.querySelector(".note-text"); 
    //     noteEdit.textContent = newText;
    //     noteText.textContent = noteEdit.textContent;
    //     event.target.classList.add("hidden");
    //     noteText.classList.remove("hidden");
    //     this.displayNotes();
    //   }
    // }

  }

  //TODO FIX
  /*
  The function here does not end when a new note is created
  */
  handleEditClick(event) {
    if (event.target.classList.contains("note")) {
      // noteEdit.classList.remove("hidden");
      // noteEdit.autofocus = true;
      const noteText = event.target.parentElement.querySelector(".note-text");
      const noteEdit = event.target.querySelector(".note-edit");
      noteEdit.classList.remove("hidden");
      //noteText.autofocus = true;
      // noteEdit.autofocus = true;
      noteEdit.focus();

      document.addEventListener("keydown", this.handleEditKey.bind(this));
      document.addEventListener("click", this.handleSaveClick.bind(this));


    }
    //find the note in the array of ontes that was clicked
    //console.log(event.target.text);
    // const note = this.NotesWall.notes.find((n)=> n.text === event.target.text);
    //console.log(note);

    // if (event.target.classList.contains("note")) { //TODO change to if event.target is instanceOf noteText
    //   const noteEdit = event.target.querySelector(".note-edit");
    //   const noteText = event.target.querySelector(".note-text");


    //   console.log("\n******** FIRST IF STMNT ********\n");

    //   noteEdit.classList.remove("hidden");
    //   noteEdit.autofocus = true;

    //   const note = this.NotesWall.notes.find((n)=> n.text === event.target.text);

    //   if (note) {
    //     console.log("\n******** NOTE FOUND ********\n");
    //   }
     
    // //   document.addEventListener("click", function (event) {
    // //     console.log("\n******** FIRST EVENT LSTNR ********\n");
    // //     const clickedElement = event.target;
        
    // //     // Check if the clicked element is not the textarea or one of its descendants
    // //     if (clickedElement !== noteEdit && !noteEdit.contains(clickedElement)) {
    // //       console.log("\n******** USER CLICKED OUTSIDE NOTE -- NOTE SAVED ********\n");
         
    // //       // Call your function when the user clicks outside of the textarea
    // //       noteEdit.classList.add("hidden");
    // //       //document.removeEventListener("click")
    // //     } else {
    // //       document.addEventListener("keydown", function (event) {
    // //         console.log("\n******** SECND EVENT LSTNR  ********\n");
    // //         if (event.key === "Enter" && event.target.value.trim() != "") {
    // //           // const note = this.NotesWall.notes.find((n)=> n.text === todoText);
    // //           console.log("\n******** USER CLICKED ENTER -- NOTE SAVED ********\n");
    // //           const newText = event.target.value.trim()
    // //           note.text = newText;
    // //           noteEdit.textContent = newText;
    // //           noteText.textContent = newText;
    // //         }
    // //       });
    // //     }
    // // });
    // //document.removeEventListener("")
    //   //TODO create two event listeners that can catch either edit input of user and handle and call this.displayNotes accordingly
    //   document.addEventListener("keydown", function (event) {
    //     if (event.key === "Enter" && event.target.value.trim() != "") {
    //       const newText = event.target.value.trim();
    //       document.addEventListener("click", function (event) {
    //         const clickedElement = event.target;
            
    //         // Check if the clicked element is not the textarea or one of its descendants
    //         if (clickedElement !== noteEdit && !noteEdit.contains(clickedElement)) {
              
    //           // Call your function when the user clicks outside of the textarea
    //           noteEdit.textContent = newText;
    //           noteText.textContent = noteEdit.textContent;
    //           note.text = newText;
    //           noteEdit.classList.add("hidden");
    //           this.displayNotes();
    //         }
    //       });
    //       // noteEdit.textContent = event.target.value.trim();
    //       // noteText.textContent = noteEdit.textContent;

    //       // console.log(note);
    //       // event.target.parentElement.text = noteText.textContent;
    //       // console.log(event.target.parentElement.text);

    //       // console.log(noteEdit.parentElement.text);
    //     }
    //     //noteEdit.textContent = event.target.value.trim();

    //     //console.log(event.target.parentElement);
    //   });
      
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
      .addEventListener("dblclick", this.handleEditClick.bind(this));

    document
      .getElementById("notes-wall")
      .addEventListener("dblclick", this.handleEditKey.bind(this));

    document
      .addEventListener("click", this.handleSaveClick.bind(this));

    this.displayNotes();
  }
}

export default StickyNotesApp;

// DELETE ICON 🗑
