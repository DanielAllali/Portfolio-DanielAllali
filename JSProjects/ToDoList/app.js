"use strict";
var _a, _b;
class Task {
    constructor(ID, Name) {
        this.ID = ID;
        this.Name = Name;
    }
}
/* ------------------------create task------------------------ */
let tasksArray = [];
if (localStorage.getItem("tasksArray") == null) {
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
}
else {
    tasksArray = JSON.parse(localStorage.getItem("tasksArray"));
}
let numberOfTasks = JSON.parse(localStorage.getItem("tasksArray")).length;
const createTask = (taskName) => {
    if (taskName != undefined && taskName != "") {
        window[`task${numberOfTasks}`] = new Task(numberOfTasks, taskName);
        tasksArray.push(window[`task${numberOfTasks}`]);
        localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
        displayTask(window[`task${numberOfTasks}`]);
        numberOfTasks++;
    }
};
let addTask = document.getElementById("addTask");
let taskNameInput = document.getElementById("taskNameInput");
let startNameError = document.getElementById("startNameError");
addTask.addEventListener("click", () => {
    if (taskNameInput.value == "") {
        startNameError.style.display = "block";
        startNameError.innerText = "name can't be empty!";
    }
    else if (taskNameInput.value.length >= 15 || taskNameInput.value.length <= 4) {
        startNameError.style.display = "block";
        startNameError.innerText = "only between 15 to 6 characters";
    }
    else {
        createTask(taskNameInput.value);
        taskNameInput.value = "";
        startNameError.style.display = "none";
        startNameError.innerText = "";
    }
});
/* ------------------------display task------------------------ */
let toDoTasks = document.getElementById("toDoTasks");
const displayTask = (task) => {
    /* task div */
    window[`taskElement${task.ID}`] = document.createElement("div");
    let taskElement = window[`taskElement${task.ID}`];
    taskElement.className = 'task';
    /* task name element */
    window[`taskNameElement${task.ID}`] = document.createElement("h1");
    let taskNameElement = window[`taskNameElement${task.ID}`];
    taskNameElement.className = 'taskName';
    taskNameElement.innerHTML = task.Name;
    /* buttons div */
    window[`buttonsDiv${task.ID}`] = document.createElement("div");
    let buttonsDiv = window[`buttonsDiv${task.ID}`];
    buttonsDiv.className = 'btnDiv';
    /* delete button */
    window[`deleteBtn${task.ID}`] = document.createElement("button");
    let deleteBtn = window[`deleteBtn${task.ID}`];
    deleteBtn.className = 'deleteTask';
    deleteBtn.innerHTML = '&#10005;';
    deleteBtn.addEventListener("click", () => { deleteTask(taskElement, task.ID); });
    /* change task btn */
    window[`changeTaskBtn${task.ID}`] = document.createElement("button");
    let changeTaskBtn = window[`changeTaskBtn${task.ID}`];
    changeTaskBtn.className = 'changeTask';
    changeTaskBtn.innerHTML = '&#9998;';
    changeTaskBtn.addEventListener("click", () => { displayChangeNamePopUp(taskNameElement, task); });
    /* done task btn */
    window[`doneTaskBtn${task.ID}`] = document.createElement("button");
    let doneTaskBtn = window[`doneTaskBtn${task.ID}`];
    doneTaskBtn.className = 'doneTask';
    doneTaskBtn.innerHTML = '&#x2713;';
    doneTaskBtn.addEventListener("click", () => { doneTask(taskElement, task); });
    /* put them inside */
    toDoTasks.appendChild(taskElement);
    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(buttonsDiv);
    buttonsDiv.appendChild(deleteBtn);
    buttonsDiv.appendChild(changeTaskBtn);
    buttonsDiv.appendChild(doneTaskBtn);
    /* ------------------------create change name popup I'M CREATING IT LIKE THIS BECAUSE OF A BUG I HAD------------------------ */
    /* main container for popup */
    window[`changeNamePopup${task.ID}`] = document.createElement("div");
    let changeNamePopup = window[`changeNamePopup${task.ID}`];
    changeNamePopup.id = "changeNamePopup";
    /* label */
    window[`nameLabel${task.ID}`] = document.createElement("label");
    let nameLabel = window[`nameLabel${task.ID}`];
    nameLabel.textContent = "Change name:";
    nameLabel.setAttribute("for", "newNameInput");
    /* input */
    window[`newNameInput${task.ID}`] = document.createElement("input");
    let newNameInput = window[`newNameInput${task.ID}`];
    newNameInput.required = true;
    newNameInput.type = "text";
    newNameInput.id = "newNameInput";
    /* name error */
    window[`nameError${task.ID}`] = document.createElement("h1");
    let nameError = window[`nameError${task.ID}`];
    nameError.id = "nameError";
    /* send button */
    window[`sendNameBtn${task.ID}`] = document.createElement("input");
    let sendNameBtn = window[`sendNameBtn${task.ID}`];
    sendNameBtn.type = "button";
    sendNameBtn.value = "Send";
    sendNameBtn.id = "sendNameBtn";
    sendNameBtn.addEventListener("click", () => { changeName(taskNameElement, task); });
    /* append them  */
    changeNamePopup.appendChild(nameLabel);
    changeNamePopup.appendChild(newNameInput);
    changeNamePopup.appendChild(nameError);
    changeNamePopup.appendChild(sendNameBtn);
    document.body.appendChild(changeNamePopup);
};
/* ------------------------create all tasks from localStorage------------------------ */
for (let i = 0; i <= tasksArray.length; i++) {
    if (tasksArray[i] != null) {
        tasksArray[i] = new Task((_a = tasksArray[i]) === null || _a === void 0 ? void 0 : _a.ID, (_b = tasksArray[i]) === null || _b === void 0 ? void 0 : _b.Name);
        displayTask(tasksArray[i]);
    }
}
/* ------------------------(delet, change, done) EVENTS------------------------ */
const deleteTask = (taskElement, taskID) => {
    taskElement.style.display = "none";
    tasksArray[taskID] = null;
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
};
const displayChangeNamePopUp = (taskNameElement_argument, task) => {
    let changeNamePopup_Arg = window[`changeNamePopup${task.ID}`];
    changeNamePopup_Arg.style.display = 'flex';
    setTimeout(() => {
        changeNamePopup_Arg.style.opacity = '1';
        changeNamePopup_Arg.style.backdropFilter = 'blur(5px)';
        changeNamePopup_Arg.style.top = "0";
    }, 1);
};
const changeName = (taskNameElement_argument, task) => {
    let newNameInput_Arg = window[`newNameInput${task.ID}`];
    let nameError_Arg = window[`nameError${task.ID}`];
    let changeNamePopup_Arg = window[`changeNamePopup${task.ID}`];
    if (newNameInput_Arg.value == "") {
        nameError_Arg.style.display = "block";
        nameError_Arg.innerText = "name can't be empty!";
    }
    else if (newNameInput_Arg.value.length >= 15 || newNameInput_Arg.value.length <= 4) {
        nameError_Arg.style.display = "block";
        nameError_Arg.innerText = "only between 15 to 6 characters";
    }
    else {
        changeNamePopup_Arg.style.opacity = '0';
        changeNamePopup_Arg.style.backdropFilter = 'blur(0)';
        changeNamePopup_Arg.style.top = "-100px";
        setTimeout(() => {
            changeNamePopup_Arg.style.display = 'none';
        }, 1000);
        taskNameElement_argument.innerText = newNameInput_Arg.value;
        task.Name = newNameInput_Arg.value;
        nameError_Arg.style.display = "none";
        nameError_Arg.innerText = "";
        newNameInput_Arg.value = "";
        localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
    }
};
/* done task*/
let doneTasks = document.getElementById("doneTasks");
const doneTask = (taskElement, task) => {
    taskElement.style.display = "none";
    doneTasks.innerHTML += `<s>${task.Name}</s><br>`;
    tasksArray[task.ID] = null;
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
};
