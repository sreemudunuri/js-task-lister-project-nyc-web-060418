document.addEventListener('DOMContentLoaded', () => {
  run()
});



function run() {
  const mainContent = document.getElementById('main-content')
  mainContent.addEventListener('click', function(event){
    event.preventDefault()
    if(event.target.id === "create-list-form-Submit") {
      createTaskForm()
      listDiv.innerHTML = bothFormsHtml()
    }
    if (event.target.id === "create-task-form-submit") {
      addTasksToList()
      listDiv.innerHTML = bothFormsHtml()
    }
    if (event.target.className === "delete-task") {
      deleteTask(parseInt(event.target.dataset.id))
      listDiv.innerHTML = bothFormsHtml()
    }
    if (event.target.className === "delete-list") {
      deleteList(parseInt(event.target.dataset.id))
      listDiv.innerHTML = bothFormsHtml()
      if (lists.length === 0) {
        var appContent = document.getElementById('app-content')
        appContent.innerHTML = ""
      }
    }
  })
}

/////////////////////////////////////////////////////////////
const listDiv = document.getElementById("app-content");

function createTaskForm(){
    const selectListFormTextValue = document.querySelector('#create-list-form input[type="text"]').value

    new List(selectListFormTextValue)
    // listDiv.innerHTML = bothFormsHtml()
}


function addTasksToList(){

    const selectListTitleId = document.querySelector('#parent-list')[document.querySelector('#parent-list').selectedIndex].dataset.id

    const selectDescriptionValue = document.querySelector('#new-task-description').value

    const selectPriorityValue = document.querySelector('#new-task-priority').value

    const listObj = lists.find(list => list.id === parseInt(selectListTitleId))
    // new Task()

    new Task(selectDescriptionValue, selectPriorityValue, listObj)
    // listDiv.innerHTML = bothFormsHtml()


}



// create options
function createOptionsHtml(){
  return lists.map(list => (
    `<option data-id="${list.id}" value="${list.title}" selected>${list.title}</option>`
  )).join(' ')
}

//
function taskFormHtml() {
  return `<form id="create-task-form">
        <label for="parent-list">Select List:</label>
        <select id="parent-list">
        ${createOptionsHtml()}
        </select>

        <label for="new-task-description">Task description:</label>
        <input required type="text" id="new-task-description" placeholder="description">

        <label for="new-task-priority">Priority level:</label>
        <input type="text" id="new-task-priority" placeholder="priority">
        <input id="create-task-form-submit" type="submit" value="Create New Task">
      </form>`
}

function addTasksHTML(list){
  // write a function to check tasks for the given list

  const tasksOfTheList = tasks.filter(task => task.listId === list.id)
  return tasksOfTheList.map(task => (
    `<li>
      Task: ${task.description}
      <button data-list-title="${list.title}" data-task-name="${task.description}" data-id="${task.id}" class="delete-task">
          X
      </button>
      <br>
      Priority: ${task.priority}
    </li>`
  )).join(' ')

}

function addListsHTML(){
  return lists.map(list => (
    `<div>
        <h2>${list.title}
          <button data-id="${list.id} " class="delete-list">
            X
          </button>
        </h2>
        <ul>
            ${addTasksHTML(list)}
        </ul>
      </div>`
  )).join(' ')
}

function listFormHtml() {
  return `<div id="lists">
            ${addListsHTML()}
          </div>`
}

function bothFormsHtml() {
  return `${taskFormHtml()} ${listFormHtml()}`
}

function deleteTask(id){

  for(const element of tasks) {
    if (element.id === id) {
      tasks.splice(tasks.indexOf(element), 1)
    }
  }

}

function deleteList(id) {
  for (const element of lists) {
    if (element.id === id) {
      lists.splice(lists.indexOf(element), 1)
    }
  }
}
