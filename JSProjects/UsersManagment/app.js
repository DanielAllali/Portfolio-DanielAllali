"use strict";
let randomDigitsArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "H", "I", "G"];
class User {
    constructor(ID, FirstName, LastName, Email, Password) {
        this.ID = ID;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Password = Password;
        this.Availability = true;
        /* Generate Unique ID */
        for (let i = 0; i <= 4; i++) {
            window[`digitNumber${i}`] = randomDigitsArr[Math.floor(Math.random() * 18)];
        }
        this.uniqueID = window[`digitNumber${1}`] + window[`digitNumber${2}`] + window[`digitNumber${3}`] + window[`digitNumber${4}`];
    }
    createUniqueID() {
        for (let i = 0; i <= 4; i++) {
            window[`digitNumber${i}`] = randomDigitsArr[Math.floor(Math.random() * 18)];
        }
        this.uniqueID = window[`digitNumber${1}`] + window[`digitNumber${2}`] + window[`digitNumber${3}`] + window[`digitNumber${4}`];
    }
}
/* ------------------------------------------create user and table of users staff------------------------------------------ */
let usersArr = [];
let numberOfUsers;
const usersInfoTable = document.getElementById("usersInfoTable");
const sendBtn = document.getElementById("sendBtn");
/* fields in form */
const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
/* fields in form */
if (localStorage.getItem("usersArr") == undefined) {
    localStorage.setItem("usersArr", JSON.stringify(usersArr));
    numberOfUsers = -1;
}
else {
    usersArr = JSON.parse(localStorage.getItem("usersArr"));
    numberOfUsers = usersArr.length - 1;
}
const createUser = () => {
    var _a;
    /* if all fields were filled */
    if (firstNameInput.value != "" &&
        lastNameInput.value != "" &&
        emailInput.value != "" &&
        passwordInput.value != "" &&
        firstNameInput.value.length <= 12 &&
        lastNameInput.value.length <= 12 &&
        emailInput.value.length <= 30 &&
        passwordInput.value.length <= 12) {
        /* if all fields were filled */
        numberOfUsers++;
        window[`user${numberOfUsers}`] = new User(numberOfUsers, firstNameInput.value, lastNameInput.value, emailInput.value, passwordInput.value);
        let user = window[`user${numberOfUsers}`];
        /* check if uniqueID is not already asign */
        for (let i = 0; i <= usersArr.length; i++) {
            if (((_a = usersArr[i]) === null || _a === void 0 ? void 0 : _a.uniqueID) == user.uniqueID) {
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
        alert("Max characters (12) Email (30)");
    }
};
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
const displayUserInfo = (user) => {
    /* ----create all elements and asign there classes----*/
    /* user information tr */
    // Create table row
    window[`userInfo${user.ID}`] = document.createElement("tr");
    let userInfo = window[`userInfo${user.ID}`];
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
    window[`userAvailability${user.ID}`] = document.createElement("td");
    let userAvailability = window[`userAvailability${user.ID}`];
    userAvailability.id = `userAvailability${user.ID}`;
    updateUserStatus(user.ID, user.Availability);
    // Create table data cell for control buttons
    let controlTd = document.createElement("td");
    controlTd.className = "controlTd";
    window[`availableBtn${user.ID}`] = document.createElement("button");
    let availableBtn = window[`availableBtn${user.ID}`];
    availableBtn.className = "controlBtn availableBtn"; // Corrected: Use className instead of class
    availableBtn.innerText = "Available";
    availableBtn.addEventListener("click", () => { updateUserStatus(user.ID, true); });
    window[`unavailableBtn${user.ID}`] = document.createElement("button");
    let unavailableBtn = window[`unavailableBtn${user.ID}`];
    unavailableBtn.className = "controlBtn unavailableBtn"; // Corrected: Use className instead of class
    unavailableBtn.innerText = "Unavailable";
    unavailableBtn.addEventListener("click", () => { updateUserStatus(user.ID, false); });
    window[`deleteBtn${user.ID}`] = document.createElement("button");
    let deleteBtn = window[`deleteBtn${user.ID}`];
    deleteBtn.className = "controlBtn deleteBtn"; // Corrected: Use className instead of class
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => { deleteUser(user.ID); });
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
};
/*------------------------------------------update user status------------------------------------------  */
const updateUserStatus = (userID, status) => {
    if (status && usersArr[userID] != null) {
        window[`userAvailability${userID}`].innerHTML = "Available";
        usersArr[userID].Availability = true;
    }
    else if (usersArr[userID] != null) {
        window[`userAvailability${userID}`].innerHTML = "Unavailable";
        usersArr[userID].Availability = false;
    }
    localStorage.setItem("usersArr", JSON.stringify(usersArr));
};
/*------------------------------------------delete user------------------------------------------  */
const deleteUser = (userID) => {
    window[`userInfo${userID}`] = document.getElementById(`userInfo${userID}`);
    window[`userInfo${userID}`].style.display = "none";
    usersArr[userID] = null;
    localStorage.setItem("usersArr", JSON.stringify(usersArr));
};
/*------------------------------------------display users from local storage------------------------------------------*/
for (let i = 0; i <= usersArr.length; i++) {
    if (usersArr[i] != null) {
        displayUserInfo(usersArr[i]);
    }
}
/* --------------------------------------------------------------------handle user searchbar--------------------------------------------------------------------*/
const searchIdInput = document.getElementById("searchIdInput");
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
const searchBtn = document.getElementById("searchBtn");
const foundUsers = document.getElementById("foundUsers");
const userFound = document.getElementById("userFound");
const closeFoundUsers = document.getElementById("closeFoundUsers");
const searchUserWithId = (id) => {
    var _a, _b, _c, _d;
    for (let i = 0; i <= usersArr.length; i++) {
        if (((_a = usersArr[i]) === null || _a === void 0 ? void 0 : _a.uniqueID) == id) {
            window[`button${(_b = usersArr[i]) === null || _b === void 0 ? void 0 : _b.uniqueID}`] = document.createElement("button");
            let userbtn = window[`button${(_c = usersArr[i]) === null || _c === void 0 ? void 0 : _c.uniqueID}`];
            userbtn.innerText = (_d = usersArr[i]) === null || _d === void 0 ? void 0 : _d.FirstName;
            userbtn.addEventListener("click", () => {
                userbtn.style.display = "none";
                displayFoundUser(usersArr[i]);
            });
            foundUsers.appendChild(userbtn);
            return;
        }
    }
    alert("user not found");
};
let userInfoFound;
const displayFoundUser = (user) => {
    window[`userInfoFound${user.ID}`] = document.createElement("tr");
    userInfoFound = window[`userInfoFound${user.ID}`];
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
};
searchBtn.addEventListener("click", () => { searchUserWithId(searchIdInput.value); });
closeFoundUsers.addEventListener("click", () => {
    userFound.style.display = "none";
    userFound.removeChild(userInfoFound);
});
