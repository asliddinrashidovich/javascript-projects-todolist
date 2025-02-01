const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')


let todos = localStorage.getItem("list") ?  JSON.parse(localStorage.getItem("list")) : [];


// set current data and time

function setTime () {
    let now = new Date();
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    let monthfor = now.getMonth()
    let dayfor = now.getDate()
    let day = now.getDate() < 10 ? '0' +  now.getDate()  : now.getDate;
    let month = now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
    let year = now.getFullYear() < 10 ? '0' + now.getFullYear() : now.getFullYear();
    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

    fullDay.textContent = `${dayfor} ${months[monthfor]}, ${year}`
    hourEl.textContent = `${hour} `
    minuteEl.textContent = `${minute}`
    secondEl.textContent = `${second}`

    return `${hour}:${minute}:${second}  -  ${month}.${day}.${year}`
}
setInterval(()=> {
    setTime()
}, 1000)


if (todos.length) setItemOfTodos()

// set todos
function setTodosLocalStorage() {
    localStorage.setItem('list', JSON.stringify(todos))
}


// set Item 
function setItemOfTodos() {
    const todos =  JSON.parse(localStorage.getItem("list"));
    listGroupTodo.innerHTML = ' '
    todos.forEach((item, i) => {
        listGroupTodo.innerHTML += `
            <li ondblclick="markTodos(${i})"  class="list-group-item d-flex  ${item.complated == true ? 'complated' : ''} justify-content-between">
              ${item.text}
              <div class="todo-icon">
                <span class="opacity-50 me-2">${item.time}</span>
                <img   src="img/edit.svg" alt="edit ocon" width="25" height="25">
                <img onclick="deleteTodos(${i})" src="img/delete.svg" alt="edit ocon" width="25" height="25">
              </div>
            </li>
        `
    })
}

// add event
formCreate.addEventListener('submit', (e)=>{
    e.preventDefault()
    let inputValue = document.querySelector('#input-create').value
    formCreate.reset();
    
    if(inputValue.length) {
        todos.push({text: inputValue, time: setTime(), complated: false})
        console.log(todos)
        setTodosLocalStorage()
        setItemOfTodos()
        
    } else {
        messageCreate.innerHTML = 'Please enter some text'
        setTimeout(() => {
            messageCreate.innerHTML = ''
        }, 2500);
    }
})


// delete items

function deleteTodos(id) {
    const delTodos =  todos.filter((item, i) => {
        return id !== i
    })

    todos = delTodos;
    console.log(todos)
    setTodosLocalStorage()
    setItemOfTodos()
}

function markTodos(id) {
    const markedTodos = todos.map((item, i) => {
        if(id == i) {
            return {...item, complated: item.complated == false ? true : false}
        } else {
            return {...item}
        }
    })
    
    todos = markedTodos;
    setTodosLocalStorage()
    setItemOfTodos()
    console.log('asliddin')
}








