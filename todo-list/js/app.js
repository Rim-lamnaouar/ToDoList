const task_input = document.querySelector("input");
const date_input = document.querySelector(".schedule-date"); 
const add_btn = document.querySelector(".add-task-button");
const todos_list_body = document.querySelector(".todos-list-body");
const alert_message = document.querySelector(".alert-message");
const delete_all_btn = document.querySelector(".delete-all-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

window.addEventListener("DOMContentLoaded", () => {
  showAllTodos();
  if (!todos.length) {
    displayTodos([]);
  }
});

function getRandomId(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters[randomIndex];
  }

  return randomId;
}

function addToDo(task_input, date_input) {
  let task = {
    id: getRandomId(10),
    task: task_input.value,
    dueDate: date_input.value,
    completed: false,
    status: "pending",
  };
  todos.push(task);
}


add_btn.addEventListener("click", () => {
  if (task_input.value === "") {
    showAlertMessage("Please enter a task!", "error");
  } else {
    addToDo(task_input, date_input); 
    saveToLocalStorage();
    showAllTodos();
    task_input.value = "";
    date_input.value = ""; 
    showAlertMessage("Task added successfully", "success");
  }
});

delete_all_btn.addEventListener("click", clearAllTodos);

//show all todos
function showAllTodos() {
  todos_list_body.innerHTML = "";
  if (todos.length === 0) {
    todos_list_body.innerHTML = `<tr><td colspan="5" class="text-center">No task found</td></tr>`;
    return;
  }

  todos.forEach((todo) => {
    todos_list_body.innerHTML += `
            <tr class="todo-item" data-id="${todo.id}">
                <td>${todo.task}</td>
                <td>${todo.dueDate || "No due date"}</td>
                <td>${todo.status}</td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="editTodo('${todo.id}')">
                        <i class="bx bx-edit-alt bx-bx-xs"></i>    
                    </button>
                    <button class="btn btn-accent btn-sm" onclick="toggleStatus('${todo.id}')">
                        <i class="bx bx-check bx-xs"></i>
                    </button>
                    <button class="btn btn-warning btn-sm" onclick="deleteTodo('${todo.id}')">
                        <i class="bx bx-trash bx-xs"></i>
                    </button>
                </td>
            </tr>
        `;
  });
}

//save todos to local storage
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}


function showAlertMessage(message, type) {
  let alert_box = `
        <div class="alert alert-${type} shadow-lg mb-5 w-full">
            <div>
                <span>
                    ${message}
                </span>
            </div>
        </div>
    `;
  alert_message.innerHTML = alert_box;
  alert_message.classList.remove("hide");
  alert_message.classList.add("show");
  setTimeout(() => {
    alert_message.classList.remove("show");
    alert_message.classList.add("hide");
  }, 3000);
}

delete todo
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveToLocalStorage();
  showAlertMessage("Todo deleted successfully", "success");
  showAllTodos();
}

function editTodo(id) {
  const todoToEdit = todos.find((todo) => todo.id === id);
    task_input.value = todoToEdit.task;
    todos = todos.filter((todo) => todo.id !== id);
    add_btn.innerHTML = "<i class='bx bx-check bx-sm'></i>";
    add_btn.addEventListener("click", () => {
    add_btn.innerHTML = "<i class='bx bx-plus bx-sm'></i>";
    todoToEdit.task = task_input.value;
    saveToLocalStorage();
    showAlertMessage("Todo updated successfully", "success");
  });
}


//clear all todos
function clearAllTodos() {
  if (todos.length > 0) {
    todos = [];
    saveToLocalStorage();
    showAlertMessage("All todos cleared successfully", "success");
    showAllTodos();
  } else {
    showAlertMessage("No todos to clear!", "error");
  }
}

// completed todos
function toggleStatus(id) {
  let todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  saveToLocalStorage();
  showAllTodos();
}

//filter todos
function filterTodos(status) {
  let filteredTodos;
  switch (status) {
    case "all":
      filteredTodos = todos;
      break;
    case "pending":
      filteredTodos = todos.filter((todo) => !todo.completed);
      break;
    case "completed":
      filteredTodos = todos.filter((todo) => todo.completed);
      break;
  }
  displayTodos(filteredTodos);
}


//display todos in status
function displayTodos(todosArray) {
  todos_list_body.innerHTML = "";
  if (todosArray.length === 0) {
    todos_list_body.innerHTML = `<tr><td colspan="5" class="text-center">No task found</td></tr>`;
    return;
  }
  todosArray.forEach((todo) => {
    todos_list_body.innerHTML += `
            <tr class="todo-item" data-id="${todo.id}">
                <td>${todo.task}</td>
                <td>${todo.dueDate || "No due date"}</td>
                <td>${todo.status}</td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="editTodo('${todo.id}')">
                        <i class="bx bx-edit-alt bx-bx-xs"></i>    
                    </button>
                    <button class="btn btn-accent btn-sm" onclick="toggleStatus('${todo.id}')">
                        <i class="bx bx-check bx-xs"></i>
                    </button>
                    <button class="btn btn-warning btn-sm" onclick="deleteTodo('${todo.id}')">
                        <i class="bx bx-trash bx-xs"></i>
                    </button>
                </td>
            </tr>
    `;
  });
}
