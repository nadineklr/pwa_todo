// define vars
let todoList = []; // todo array, stores todo items
let todoForm = document.querySelector("#todo-form"); // input form for new todos
let todoDisplay = document.querySelector(".todo-list .todos-box"); // todo display list
let todoPlaceholder = document.querySelector(".todo-list-placeholder"); // placeholder for empty todo list
let errorMessage = document.querySelector(".error-message"); // error message

// Function to update the cache with the current todo list data
function updateTodoCache() {
  if ("caches" in window) {
    caches.open("todo-cache").then((cache) => {
      cache.put("todo-list", new Response(JSON.stringify(todoList)));
    });
  }
}

// Check in cache if there are any todo objects cached
if ("caches" in window) {
  caches.open("todo-cache").then((cache) => {
    cache
      .match("todo-list")
      .then((response) => {
        // if yes - add todo list to display in app
        if (response) {
          return response.json();
        }
        return [];
      })
      .then((data) => {
        todoList = data;
        addToList(todoList);
      });
  });
}

//  Listen to form for new todos
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // check for form data
  const formData = new FormData(todoForm);
  // console.log(formData);

  if (isFormDataEmpty(formData)) {
    // Display error message
    errorMessage.classList.remove("no-display");
    return; // Stop execution if form data is empty
  } else {
    // hide error message
    errorMessage.classList.add("no-display");
  }

  let formObject = {};

  // set vars
  const todoTitle = formData.get("todoTitle");
  const todoStatus = false; // default

  formData.forEach(function (title) {
    formObject["todoTitle"] = title;
  });

  // Log the form data
  // console.log(formObject);
  // add new object to list
  todoList.push(formObject);

  // Add new object to cache after adding a new item
  updateTodoCache();

  // console.log(todoList);
  addToList(todoList);

  // Clear input fields
  todoForm.reset();
});

// Function to check if form data is empty
function isFormDataEmpty(formData) {
  for (const value of formData.values()) {
    if (value.trim() !== "") {
      return false; // stop here if input is empty
    }
  }
  return true;
}

// add todos to list
function addToList(todoArray) {
  //  clean list
  todoDisplay.textContent = "";
  //  add all existing items to list
  //  the index helps to delete todo items or update the status, also it makes sure that all IDs are unique
  todoArray.forEach((todo, index) => {
    let todoElement = `<div class="todo-item item-box">
        <div class="item-wrapper">
          <div class="todo-options">
            <form action="" class="todo-list-check">
              <label for="todo-checkbox-${index}">Status</label>
              <input class="todo-checkbox" type="checkbox" name="todo_status" id="todo-checkbox-${index}" data-index="${index}" ${todo.status ? "checked" : ""}>
            </form>
          </div>
          <div class="todo-info">
            <p class="todo-title" >${todo.todoTitle}</p>
          </div>
        </div>
        <div class="todo-delete"><button class="delete-button" data-index="${index}" title="Delete"></button></div>
      </div>`;

    // Append the created element to todoDisplay
    todoDisplay.innerHTML += todoElement;
  });

  // Add event listener for delete buttons
  let deleteBtn = document.querySelectorAll(".todo-delete button");

  deleteBtn.forEach((item) => {
    item.addEventListener("click", function (e) {
      // get index from data-index attribute
      const indexToDelete = e.target.dataset.index;

      // remove the element from the todoList
      todoList.splice(indexToDelete, 1);

      // update the displayed list
      addToList(todoList);

      // Update cache todo list after deleting an item
      updateTodoCache();
    });
  });

  // Listen to checkboxes on change
  let checkbox = document.querySelectorAll(".todo-checkbox");

  checkbox.forEach((item, index) => {
    item.addEventListener("change", function () {
      if (this.checked) {
        // todo marked as done
        todoList[index].status = this.checked;
      } else {
        // todo marked as undone
        todoList[index].status = false;
      }

      // Update cache todo list after changing checkbox status
      updateTodoCache();
    });
  });
  updatePlaceholder();
}

// Update the visibility of the placeholder based on todoList
function updatePlaceholder() {
  if (todoList.length === 0) {
    todoPlaceholder.classList.remove("no-display");
  } else {
    todoPlaceholder.classList.add("no-display");
  }
}
