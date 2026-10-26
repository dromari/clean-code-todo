const taskInput = document.getElementById("new-task");
const addButton = document.querySelector("button");
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.textContent = taskString;
  label.className = "task";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.textContent = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value.trim()) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  taskInput.value = "";
};

const editTask = function (taskItem) {
  const editInput = taskItem.querySelector("input[type=text]");
  const label = taskItem.querySelector("label");
  const editButton = taskItem.querySelector(".edit");

  const containsClass = taskItem.classList.contains("editMode");

  if (containsClass) {
    label.textContent = editInput.value;
    editButton.textContent = "Edit";
    taskItem.classList.remove("editMode");
    return;
  }

  editInput.value = label.textContent;
  editButton.textContent = "Save";
  taskItem.classList.add("editMode");
};

const deleteTask = function (taskItem) {
  taskItem.remove();
};

const handleTodoListClick = function (event) {
  const taskItem = event.target.closest("li");
  if (!taskItem) return;

  if (event.target.closest(".edit")) {
    editTask(taskItem);
    return;
  }

  if (event.target.closest(".delete")) {
    deleteTask(taskItem);
    return;
  }

  if (event.target.type === "checkbox") {
    const currentList = taskItem.parentNode;
    const targetHolder =
      currentList === incompleteTaskHolder
        ? completedTasksHolder
        : incompleteTaskHolder;

    taskItem.classList.remove("editMode");
    const editButton = taskItem.querySelector(".edit");
    if (editButton) {
      editButton.textContent = "Edit";
    }

    targetHolder.appendChild(taskItem);
  }
};

addButton.addEventListener("click", addTask);
incompleteTaskHolder.addEventListener("click", handleTodoListClick);
completedTasksHolder.addEventListener("click", handleTodoListClick);
