class Task {
    public ID: number;
    public Name: string;
    constructor(ID: number, Name: string,) {
        this.ID = ID;
        this.Name = Name;
    }

    /* public get ID(): number { return this._ID; }
    public set ID(value: number) { this._ID = value; }

    public get Name(): string { return this._Name; }
    public set Name(value: string) { this._Name = value; } */
}
/* ------------------------create task------------------------ */
let tasksArray: Array<Task | null> = [];
if (localStorage.getItem("tasksArray") == null) {
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
}
else {
    tasksArray = JSON.parse(localStorage.getItem("tasksArray") as string);
}
let numberOfTasks: number = JSON.parse(localStorage.getItem("tasksArray") as string).length;
const createTask = (taskName: string) => {
    if (taskName != undefined && taskName != "") {
        (window as any)[`task${numberOfTasks}`] = new Task(numberOfTasks, taskName);
        tasksArray.push((window as any)[`task${numberOfTasks}`]);
        localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
        displayTask((window as any)[`task${numberOfTasks}`]);
        numberOfTasks++;
    }
}


let addTask: HTMLInputElement = document.getElementById("addTask") as HTMLInputElement;
let taskNameInput: HTMLInputElement = document.getElementById("taskNameInput") as HTMLInputElement;
let startNameError: HTMLHeadElement = document.getElementById("startNameError") as HTMLHeadElement;

addTask.addEventListener("click", () => {
    if (taskNameInput.value == "") {
        startNameError.style.display = "block"
        startNameError.innerText = "name can't be empty!";
    }
    else if (taskNameInput.value.length >= 15 || taskNameInput.value.length <= 4) {
        startNameError.style.display = "block"
        startNameError.innerText = "only between 15 to 6 characters";
    }
    else {
        createTask(taskNameInput.value)
        taskNameInput.value = "";
        startNameError.style.display = "none";
        startNameError.innerText = "";
    }
})


/* ------------------------display task------------------------ */
let toDoTasks: HTMLDivElement = document.getElementById("toDoTasks") as HTMLDivElement;

const displayTask = (task: Task) => {
    /* task div */
    (window as any)[`taskElement${task.ID}`] = document.createElement("div");
    let taskElement = (window as any)[`taskElement${task.ID}`];
    taskElement.className = 'task';

    /* task name element */
    (window as any)[`taskNameElement${task.ID}`] = document.createElement("h1");
    let taskNameElement = (window as any)[`taskNameElement${task.ID}`];
    taskNameElement.className = 'taskName';
    taskNameElement.innerHTML = task.Name;
    /* buttons div */
    (window as any)[`buttonsDiv${task.ID}`] = document.createElement("div");
    let buttonsDiv = (window as any)[`buttonsDiv${task.ID}`];
    buttonsDiv.className = 'btnDiv';
    /* delete button */
    (window as any)[`deleteBtn${task.ID}`] = document.createElement("button");
    let deleteBtn = (window as any)[`deleteBtn${task.ID}`];
    deleteBtn.className = 'deleteTask';
    deleteBtn.innerHTML = '&#10005;';
    deleteBtn.addEventListener("click", () => { deleteTask(taskElement, task.ID) });

    /* change task btn */
    (window as any)[`changeTaskBtn${task.ID}`] = document.createElement("button");
    let changeTaskBtn = (window as any)[`changeTaskBtn${task.ID}`];
    changeTaskBtn.className = 'changeTask';
    changeTaskBtn.innerHTML = '&#9998;';
    changeTaskBtn.addEventListener("click", () => { displayChangeNamePopUp(taskNameElement, task) });
    /* done task btn */
    (window as any)[`doneTaskBtn${task.ID}`] = document.createElement("button");
    let doneTaskBtn = (window as any)[`doneTaskBtn${task.ID}`];
    doneTaskBtn.className = 'doneTask';
    doneTaskBtn.innerHTML = '&#x2713;';
    doneTaskBtn.addEventListener("click", () => { doneTask(taskElement, task) });


    /* put them inside */
    toDoTasks.appendChild(taskElement);
    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(buttonsDiv);
    buttonsDiv.appendChild(deleteBtn);
    buttonsDiv.appendChild(changeTaskBtn);
    buttonsDiv.appendChild(doneTaskBtn);

    /* ------------------------create change name popup I'M CREATING IT LIKE THIS BECAUSE OF A BUG I HAD------------------------ */
    /* main container for popup */
    (window as any)[`changeNamePopup${task.ID}`] = document.createElement("div");
    let changeNamePopup = (window as any)[`changeNamePopup${task.ID}`];
    changeNamePopup.id = "changeNamePopup";

    /* label */
    (window as any)[`nameLabel${task.ID}`] = document.createElement("label");
    let nameLabel = (window as any)[`nameLabel${task.ID}`];
    nameLabel.textContent = "Change name:";
    nameLabel.setAttribute("for", "newNameInput");

    /* input */
    (window as any)[`newNameInput${task.ID}`] = document.createElement("input");
    let newNameInput = (window as any)[`newNameInput${task.ID}`];
    newNameInput.required = true;
    newNameInput.type = "text";
    newNameInput.id = "newNameInput";

    /* name error */
    (window as any)[`nameError${task.ID}`] = document.createElement("h1");
    let nameError = (window as any)[`nameError${task.ID}`];
    nameError.id = "nameError";

    /* send button */
    (window as any)[`sendNameBtn${task.ID}`] = document.createElement("input");
    let sendNameBtn = (window as any)[`sendNameBtn${task.ID}`];
    sendNameBtn.type = "button";
    sendNameBtn.value = "Send";
    sendNameBtn.id = "sendNameBtn";
    sendNameBtn.addEventListener("click", () => { changeName(taskNameElement, task) })

    /* append them  */
    changeNamePopup.appendChild(nameLabel);
    changeNamePopup.appendChild(newNameInput);
    changeNamePopup.appendChild(nameError);
    changeNamePopup.appendChild(sendNameBtn);

    document.body.appendChild(changeNamePopup);
}

/* ------------------------create all tasks from localStorage------------------------ */
for (let i = 0; i <= tasksArray.length; i++) {

    if (tasksArray[i] != null) {
        tasksArray[i] = new Task(tasksArray[i]?.ID as number, tasksArray[i]?.Name as string);
        displayTask(tasksArray[i] as Task);
    }
}


/* ------------------------(delet, change, done) EVENTS------------------------ */

const deleteTask = (taskElement: HTMLDivElement, taskID: number) => {
    taskElement.style.display = "none";
    tasksArray[taskID] = null;
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
}

const displayChangeNamePopUp = (taskNameElement_argument: HTMLHeadElement, task: Task) => {
    let changeNamePopup_Arg = (window as any)[`changeNamePopup${task.ID}`];

    changeNamePopup_Arg.style.display = 'flex';
    setTimeout(() => {
        changeNamePopup_Arg.style.opacity = '1';
        changeNamePopup_Arg.style.backdropFilter = 'blur(5px)';
        changeNamePopup_Arg.style.top = "0";
    }, 1)
}



const changeName = (taskNameElement_argument: HTMLHeadElement, task: Task) => {
    let newNameInput_Arg = (window as any)[`newNameInput${task.ID}`];
    let nameError_Arg = (window as any)[`nameError${task.ID}`];
    let changeNamePopup_Arg = (window as any)[`changeNamePopup${task.ID}`];

    if (newNameInput_Arg.value == "") {
        nameError_Arg.style.display = "block"
        nameError_Arg.innerText = "name can't be empty!";
    }
    else if (newNameInput_Arg.value.length >= 15 || newNameInput_Arg.value.length <= 4) {
        nameError_Arg.style.display = "block"
        nameError_Arg.innerText = "only between 15 to 6 characters";
    }
    else {
        changeNamePopup_Arg.style.opacity = '0';
        changeNamePopup_Arg.style.backdropFilter = 'blur(0)';
        changeNamePopup_Arg.style.top = "-100px";
        setTimeout(() => {
            changeNamePopup_Arg.style.display = 'none';
        }, 1000)
        taskNameElement_argument.innerText = newNameInput_Arg.value;
        task.Name = newNameInput_Arg.value;
        nameError_Arg.style.display = "none"
        nameError_Arg.innerText = "";
        newNameInput_Arg.value = "";
        localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
    }
}
/* done task*/

let doneTasks: HTMLDivElement = document.getElementById("doneTasks") as HTMLDivElement;

const doneTask = (taskElement: HTMLDivElement, task: Task) => {
    taskElement.style.display = "none"
    doneTasks.innerHTML += `<s>${task.Name}</s><br>`;
    tasksArray[task.ID] = null;
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
}
