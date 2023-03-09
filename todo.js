const form = document.querySelector("#new-item-form")
const list = document.querySelector("#list")
const input = document.querySelector("#item-input")
const TODO_LIST_KEY="Todo-list";
let todo=load()
todo.forEach(reload)

form.addEventListener('submit', e=>{
    e.preventDefault()
    const inp = input.value
    //checking if input value is == ""
    if(inp === "") return
    const newTodoItem = { id: Date.now(), value: inp }
    todo.push(newTodoItem)
    reload(newTodoItem)
    save(todo)
    input.value=""
})

function reload(todoItem){
    //creating html elements with text and ID
    const item = document.createElement("div")
    item.innerText = todoItem.value
    item.classList.add("list-items")
    item.setAttribute('data-id', todoItem.id)
    //push the created html elements into the list div
    list.appendChild(item)
    item.addEventListener('click', () => {
        const itemId = item.getAttribute('data-id')
        removeItem(itemId)
    })
}

function load(){
    const loa = localStorage.getItem(TODO_LIST_KEY)
    return JSON.parse(loa) || []
}

function save(todoList){
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList))
}

function removeItem(itemId) {
    // remove the element from the DOM
    const item = document.querySelector(`[data-id="${itemId}"]`)
    item.remove()
    // remove the element from the todo list
    todo = todo.filter(todoItem => todoItem.id !== parseInt(itemId))
    // update the todo list in local storage
    save(todo)
}