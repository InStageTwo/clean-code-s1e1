var taskInput = document.getElementById("new-task");
var addButton = document.querySelector(".todo-app__button_add");
var incompleteTaskHolder = document.getElementById("incompleteTasks");
var completeTasksHolder = document.getElementById("completeTasks");

// New task list item
var createNewTaskElement = function (taskString) {
    var listItem = document.createElement("li");
    listItem.className = "todo-app__task-item";

    // input (checkbox)
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "todo-app__checkbox";

    // label
    var label = document.createElement("label");
    label.innerText = taskString;
    label.className = "todo-app__task";

    // input (text)
    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "todo-app__input todo-app__input-edit";

    // button.edit
    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "todo-app__button todo-app__button_edit";

    // button.delete
    var deleteButton = document.createElement("button");
    deleteButton.className = "todo-app__button todo-app__button_delete";
    var deleteButtonImg = document.createElement("img");
    deleteButtonImg.className = "todo-app__button-image";
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);

    // and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask = function () {
    console.log("Add Task...");
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

// Edit an existing task.
var editTask = function () {
    console.log("Edit Task...");
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text].todo-app__input-edit");
    var label = listItem.querySelector("label");
    var editBtn = this;
    var containsClass = listItem.classList.contains("todo-app__task-item-edit-mode");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
        editInput.style.display = "none";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
        editInput.style.display = "block";
    }

    listItem.classList.toggle("todo-app__task-item-edit-mode");
};

// Delete task.
var deleteTask = function () {
    console.log("Delete Task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

// Mark task completed
var taskCompleted = function () {
    console.log("Complete Task...");
    var listItem = this.parentNode;
    completeTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

// Mark task as incomplete.
var taskIncomplete = function () {
    console.log("Incomplete Task...");
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    var checkBox = taskListItem.querySelector(".todo-app__checkbox");
    var editButton = taskListItem.querySelector(".todo-app__button_edit");
    var deleteButton = taskListItem.querySelector(".todo-app__button_delete");

    // Bind editTask to edit button.
    if (editButton) {
        editButton.onclick = editTask;
    } else {
        console.error("Edit button not found");
    }
    // Bind deleteTask to delete button.
    if (deleteButton) {
        deleteButton.onclick = deleteTask;
    } else {
        console.error("Delete button not found");
    }
    // Bind taskCompleted to checkBoxEventHandler.
    if (checkBox) {
        checkBox.onchange = checkBoxEventHandler; 
    } else {
        console.error("Checkbox not found");
    }
}


addButton.onclick = addTask;

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completeTasksHolder.children.length; i++) {
  bindTaskEvents(completeTasksHolder.children[i], taskIncomplete);
}