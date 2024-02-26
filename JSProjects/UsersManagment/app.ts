let randomDigitsArr: Array<string> = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "H", "I", "G"];
class User {
    public ID: number;
    public FirstName: string;
    public LastName: string;
    public Email: string;
    public Password: string;
    public Availability: boolean;
    public uniqueID: string;

    constructor(ID: number, FirstName: string, LastName: string, Email: string, Password: string) {
        this.ID = ID;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Password = Password;
        this.Availability = true;
        /* Generate Unique ID */
        for (let i = 0; i <= 4; i++) {
            (window as any)[`digitNumber${i}`] = randomDigitsArr[Math.floor(Math.random() * 18)];
        }
        this.uniqueID = (window as any)[`digitNumber${1}`] + (window as any)[`digitNumber${2}`] + (window as any)[`digitNumber${3}`] + (window as any)[`digitNumber${4}`];
    }
    createUniqueID() {
        for (let i = 0; i <= 4; i++) {
            (window as any)[`digitNumber${i}`] = randomDigitsArr[Math.floor(Math.random() * 18)];
        }
        this.uniqueID = (window as any)[`digitNumber${1}`] + (window as any)[`digitNumber${2}`] + (window as any)[`digitNumber${3}`] + (window as any)[`digitNumber${4}`];
    }
    /* public get ID(): number { return this._ID; }
    public set ID(value: number) { this._ID = value; }

    public get FirstName(): string { return this._FirstName; }
    public set FirstName(value: string) { this._FirstName = value; }

    public get LastName(): string { return this._LastName; }
    public set LastName(value: string) { this._LastName = value; }

    public get Email(): string { return this._Email }
    public set Email(value: string) { this._Email = value; }

    public get Password(): string { return this._Password; }
    public set Password(value: string) { this._Password = value; }

    public get Availability(): boolean { return this._Availability; }
    public set Availability(value: boolean) { this._Availability = value; } */
}


/* ------------------------------------------create user and table of users staff------------------------------------------ */

let usersArr: Array<User | null> = [];
let numberOfUsers: number;
const usersInfoTable: HTMLTableElement = document.getElementById("usersInfoTable") as HTMLTableElement;
const sendBtn: HTMLButtonElement = document.getElementById("sendBtn") as HTMLButtonElement;

/* fields in form */
const firstNameInput: HTMLInputElement = document.getElementById("firstNameInput") as HTMLInputElement;
const lastNameInput: HTMLInputElement = document.getElementById("lastNameInput") as HTMLInputElement;
const emailInput: HTMLInputElement = document.getElementById("emailInput") as HTMLInputElement;
const passwordInput: HTMLInputElement = document.getElementById("passwordInput") as HTMLInputElement;
/* fields in form */
if (localStorage.getItem("usersArr") == undefined) {
    localStorage.setItem("usersArr", JSON.stringify(usersArr));
    numberOfUsers = -1;
}
else {
    usersArr = JSON.parse(localStorage.getItem("usersArr") as string);
    numberOfUsers = usersArr.length - 1;
}
const createUser = () => {
    /* if all fields were filled */
    if (
        firstNameInput.value != "" &&
        lastNameInput.value != "" &&
        emailInput.value != "" &&
        passwordInput.value != "" &&
        firstNameInput.value.length <= 12 &&
        lastNameInput.value.length <= 12 &&
        emailInput.value.length <= 30 &&
        passwordInput.value.length <= 12) {
        /* if all fields were filled */
        numberOfUsers++;
        (window as any)[`user${numberOfUsers}`] = new User(numberOfUsers, firstNameInput.value, lastNameInput.value, emailInput.value, passwordInput.value);
        let user = (window as any)[`user${numberOfUsers}`];

        /* check if uniqueID is not already asign */
        for (let i = 0; i <= usersArr.length; i++) {
            if (usersArr[i]?.uniqueID == user.uniqueID) {
                user.createUniqueID();
            }
        }

        usersArr.push(user);
        localStorage.setItem("usersArr", JSON.stringify(usersArr));
        displayUserInfo(user);
        /* reset inputs */
        updateUserStatus(user.ID, user.Availability);
        firstNameInput.value = "";
        lastNameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
    }
    else {
        alert("Max characters (12) Email (30)")
    }
}

sendBtn.addEventListener("click", createUser);
/* ------------------------------------------inputs events------------------------------------------ */
firstNameInput.addEventListener("focus", () => {
    if (firstNameInput.value == "First name") {
        firstNameInput.value = "";
    }
});
firstNameInput.addEventListener("blur", () => {
    if (firstNameInput.value == "") {
        firstNameInput.value = "First name";
    }
});
lastNameInput.addEventListener("focus", () => {
    if (lastNameInput.value == "Last name") {
        lastNameInput.value = "";
    }
});
lastNameInput.addEventListener("blur", () => {
    if (lastNameInput.value == "") {
        lastNameInput.value = "Last name";
    }
});
emailInput.addEventListener("focus", () => {
    if (emailInput.value == "Email") {
        emailInput.value = "";
    }
});
emailInput.addEventListener("blur", () => {
    if (emailInput.value == "") {
        emailInput.value = "Email";
    }
});







/*------------------------------------------display user information------------------------------------------  */
const displayUserInfo = (user: User) => {
    /* ----create all elements and asign there classes----*/
    /* user information tr */
    // Create table row
    (window as any)[`userInfo${user.ID}`] = document.createElement("tr");
    let userInfo = (window as any)[`userInfo${user.ID}`];
    userInfo.id = `userInfo${user.ID}`;

    // Create table data cells for user data
    let firstName = document.createElement("td");
    firstName.innerText = user.FirstName;
    let lastName = document.createElement("td");
    lastName.innerText = user.LastName;
    let email = document.createElement("td");
    email.innerText = user.Email;
    let password = document.createElement("td");
    password.innerText = user.Password;

    // Create table data cell for user availability
    (window as any)[`userAvailability${user.ID}`] = document.createElement("td");
    let userAvailability = (window as any)[`userAvailability${user.ID}`];
    userAvailability.id = `userAvailability${user.ID}`;
    updateUserStatus(user.ID, user.Availability);

    // Create table data cell for control buttons
    let controlTd = document.createElement("td");
    controlTd.className = "controlTd";

    (window as any)[`availableBtn${user.ID}`] = document.createElement("button");
    let availableBtn = (window as any)[`availableBtn${user.ID}`];
    availableBtn.className = "controlBtn availableBtn"; // Corrected: Use className instead of class
    availableBtn.innerText = "Available";
    availableBtn.addEventListener("click", () => { updateUserStatus(user.ID, true) });

    (window as any)[`unavailableBtn${user.ID}`] = document.createElement("button");
    let unavailableBtn = (window as any)[`unavailableBtn${user.ID}`];
    unavailableBtn.className = "controlBtn unavailableBtn"; // Corrected: Use className instead of class
    unavailableBtn.innerText = "Unavailable";
    unavailableBtn.addEventListener("click", () => { updateUserStatus(user.ID, false) });

    (window as any)[`deleteBtn${user.ID}`] = document.createElement("button");
    let deleteBtn = (window as any)[`deleteBtn${user.ID}`];
    deleteBtn.className = "controlBtn deleteBtn"; // Corrected: Use className instead of class
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => { deleteUser(user.ID) });

    let uniqueIdElement = document.createElement("h4");
    uniqueIdElement.innerText = "ID: " + user.uniqueID;
    uniqueIdElement.className = "uniqueID";


    // Append buttons to control cell
    controlTd.appendChild(availableBtn);
    controlTd.appendChild(unavailableBtn);
    controlTd.appendChild(deleteBtn);
    controlTd.appendChild(uniqueIdElement);

    // Append cells to table row
    userInfo.appendChild(firstName);
    userInfo.appendChild(lastName);
    userInfo.appendChild(email);
    userInfo.appendChild(password);
    userInfo.appendChild(userAvailability);
    userInfo.appendChild(controlTd); // Append control cell to table row

    // Append row to table
    usersInfoTable.appendChild(userInfo);
}



/*------------------------------------------update user status------------------------------------------  */

const updateUserStatus = (userID: number, status: boolean) => {
    if (status && usersArr[userID] != null) {
        (window as any)[`userAvailability${userID}`].innerHTML = "Available";
        (usersArr[userID] as User).Availability = true;
    }
    else if (usersArr[userID] != null) {
        (window as any)[`userAvailability${userID}`].innerHTML = "Unavailable";
        (usersArr[userID] as User).Availability = false;
    }
    localStorage.setItem("usersArr", JSON.stringify(usersArr));
}

/*------------------------------------------delete user------------------------------------------  */

const deleteUser = (userID: number) => {
    (window as any)[`userInfo${userID}`] = document.getElementById(`userInfo${userID}`) as HTMLTableRowElement;
    (window as any)[`userInfo${userID}`].style.display = "none";
    usersArr[userID] = null;
    localStorage.setItem("usersArr", JSON.stringify(usersArr));
}

/*------------------------------------------display users from local storage------------------------------------------*/
for (let i = 0; i <= usersArr.length; i++) {
    if (usersArr[i] != null) {
        displayUserInfo(usersArr[i] as User);
    }
}


/* --------------------------------------------------------------------handle user searchbar--------------------------------------------------------------------*/
const searchIdInput: HTMLInputElement = document.getElementById("searchIdInput") as HTMLInputElement;
searchIdInput.addEventListener("focus", () => {
    if (searchIdInput.value == "ID") {
        searchIdInput.value = "";
    }
});
searchIdInput.addEventListener("blur", () => {
    if (searchIdInput.value == "") {
        searchIdInput.value = "ID";
    }
});

const searchBtn: HTMLButtonElement = document.getElementById("searchBtn") as HTMLButtonElement;
const foundUsers: HTMLDivElement = document.getElementById("foundUsers") as HTMLDivElement;
const userFound: HTMLDivElement = document.getElementById("userFound") as HTMLDivElement;
const closeFoundUsers: HTMLDataElement = document.getElementById("closeFoundUsers") as HTMLDataElement;

const searchUserWithId = (id: string) => {

    for (let i = 0; i <= usersArr.length; i++) {
        if (usersArr[i]?.uniqueID == id) {
            (window as any)[`button${usersArr[i]?.uniqueID}`] = document.createElement("button");
            let userbtn = (window as any)[`button${usersArr[i]?.uniqueID}`];
            userbtn.innerText = usersArr[i]?.FirstName;
            userbtn.addEventListener("click", () => {
                userbtn.style.display = "none";
                displayFoundUser(usersArr[i] as User)
            });
            foundUsers.appendChild(userbtn);
            return;
        }
    }
    alert("user not found");
}
let userInfoFound: HTMLTableRowElement;
const displayFoundUser = (user: User) => {
    (window as any)[`userInfoFound${user.ID}`] = document.createElement("tr");
    userInfoFound = (window as any)[`userInfoFound${user.ID}`];
    userInfoFound.id = `userInfoFound${user.ID}`;

    // Create table data cells for user data
    let firstNameFound = document.createElement("td");
    firstNameFound.innerText = user.FirstName;
    let lastNameFound = document.createElement("td");
    lastNameFound.innerText = user.LastName;
    let emailFound = document.createElement("td");
    emailFound.innerText = user.Email;
    let passwordFound = document.createElement("td");
    passwordFound.innerText = user.Password;


    userFound.appendChild(userInfoFound);
    userFound.style.display = "flex";

    userInfoFound.appendChild(firstNameFound);
    userInfoFound.appendChild(lastNameFound);
    userInfoFound.appendChild(emailFound);
    userInfoFound.appendChild(passwordFound);
}

searchBtn.addEventListener("click", () => { searchUserWithId(searchIdInput.value); });
closeFoundUsers.addEventListener("click", () => {
    userFound.style.display = "none"
    userFound.removeChild(userInfoFound);
});