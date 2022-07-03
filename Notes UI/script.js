

const saveButton = document.querySelector('#btnSave')
const titleInput = document.querySelector('#title')
const descriptionInput = document.querySelector('#description')
const noteContainer = document.querySelector('#notes__container')
const deleteButton = document.querySelector('#btnDelete')
const deselectButton = document.querySelector('#btnDeselect')





function clearForm(){
    titleInput.value = "";
    descriptionInput.value = "";
    deleteButton.classList.add("hidden");
    deselectButton.classList.add("hidden");
}
function deselectForm(){
    saveButton.removeAttribute("data-id");
    deleteButton.removeAttribute("data-id");
    clearForm();
}

function displayNoteInForm(note){
    titleInput.value = note.title;
    descriptionInput.value = note.description;
    deleteButton.classList.remove("hidden");
    deselectButton.classList.remove("hidden");
    deleteButton.setAttribute("data-id",note.id);
    saveButton.setAttribute("data-id",note.id);
}

function getNoteById(id){
    fetch('https://localhost:7103/api/notes/'+id)
    .then(data => data.json())
    .then(Response =>displayNoteInForm(Response));
}

function populateForm(id, title, description){
    getNoteById(id);
}

function addNote(title, description){

    const body = {
        title:title,
        description:description,
        isVisible: true
    };

    fetch('https://localhost:7103/api/notes',{
        method:'POST',
        body: JSON.stringify(body),
        headers:{
            "content-type" : "application/json"
        }
    })
    .then(data => data.json())
    .then(Response =>{
        clearForm();
        getAllNotes();
    });
}



function displayNotes(notes){

let allNotes = "";


    notes.forEach(note => {
        const noteElement =`
                            <div class="note" data-id="${note.id}">
                            <h3>${note.title} </h3>
                            <p>${note.description}</p>
                            </div>
                          `;
                          allNotes += noteElement 
        
                        
    });

noteContainer.innerHTML = allNotes;



//add event addEventListener
document.querySelectorAll('.note').forEach(note =>{
    note.addEventListener('click',function(){
      
        populateForm( note.dataset.id);
       
        });
})
}
function getAllNotes(){
    fetch('https://localhost:7103/api/notes')
    .then(data => data.json())
    .then(Response =>displayNotes(Response));
}

getAllNotes();

function updateNode(id,title,description){
    const body = {
        title:title,
        description:description,
        isVisible: true
    };

    fetch('https://localhost:7103/api/notes/'+id,{
        method:'PUT',
        body: JSON.stringify(body),
        headers:{
            "content-type" : "application/json"
        }
    })
    .then(data => data.json())
    .then(Response =>{
        clearForm();
        getAllNotes();
    });
}
saveButton.addEventListener('click',function(){
    
const id = saveButton.dataset.id;
if(id){
    updateNode(id,titleInput.value,descriptionInput.value)
}else{
    addNote(titleInput.value,descriptionInput.value);
}

});

function deleteNote(id){
    fetch('https://localhost:7103/api/notes/'+id,{
        method:'DELETE',
        headers:{
            "content-type" : "application/json"
        }
    })
    .then(Response =>{
        clearForm();
        getAllNotes();
    });
}


deleteButton.addEventListener("click",function(){
   const id = deleteButton.dataset.id;
 deleteNote(id);
});

deselectButton.addEventListener("click",function(){
    deselectForm();
    clearForm();
    getAllNotes();
 });