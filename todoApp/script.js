const form = document.getElementById("form")
const input = document.getElementById("input")
const todoUL = document.getElementById("todos")
const todos = JSON.parse(localStorage.getItem('todos'))
if(todos) {
    todos.forEach(todo => {
        addTodo(todo)
    })

}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    addTodo()
})


function addTodo(todo) {
    let todotext = input.value

    if (todo) {
        todotext = todo.text
    }

    if(todotext) {
        const todoEl = document.createElement("li")

        if(todo && todo.completed) {
            todoEl.classList.toggle("completed")
        }

        todoEl.innerHTML = todotext
        
        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle('completed');
        })

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todoEl.remove();

            updateLS()
        })

        console.log(todoEl, todo)
        todoUL.appendChild(todoEl)

        input.value = ""
        updateLS()
    }
}


function updateLS() {
    const todosEl = document.querySelectorAll("li")
    const todos = []
    todosEl.forEach(todo => {
        todos.push({
            text: todo.innerText,
            completed: todo.classList.contains("completed")
        })

    })
    localStorage.setItem("todos", JSON.stringify(todos))
}
