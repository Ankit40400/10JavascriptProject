const addBtn = document.getElementById("add")
console.log(addBtn)
const notes = JSON.parse(localStorage.getItem("notes"))
console.log(notes)
if(notes) {
    notes.forEach(note => {
        if(note.length > 0){
            AddNewNote(note)
        }
    })
}

addBtn.addEventListener("click", function() {
    AddNewNote()
})


function AddNewNote(text = '') {
    const note = document.createElement("div")
    note.classList.add("note")

    note.innerHTML = `
        <div class="notes">
        <div class="tools">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"> </textarea>
        </div>
    `

    const editBtn = note.querySelector(".edit")
    const deleteBtn = note.querySelector(".delete")

    const main = note.querySelector(".main")
    const textArea = note.querySelector("textarea")
    textArea.value = text
    main.innerHTML = marked.parse(text)

    deleteBtn.addEventListener("click", ()=> {
        note.remove()
    })

    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden")
        textArea.classList.toggle("hidden")
    })


    textArea.addEventListener("input", (e) => {
        const {value} = e.target
        main.innerHTML = marked.parse(value)

        updateLS();
    })

    document.body.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')
    const notes = []

    notesText.forEach(note => { 
        notes.push(note.value)
    })

    localStorage.setItem('notes', JSON.stringify(notes))
}