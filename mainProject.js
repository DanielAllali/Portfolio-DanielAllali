/* LOADING animation & appear of page */
let loadingDiv = document.getElementById("loadingDiv");
let allPage = document.getElementById("allPage");
function pageAppear() {
    console.log("dasdas");
    loadingDiv.style.opacity = "0";
    allPage.style.display = "block";
    setTimeout(function () {
        loadingDiv.style.display = "none";
        allPage.style.opacity = "1";
    }, 1000)
}
setTimeout(pageAppear, 3000);

/* contact input things */
/* contact input things */
let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let message = document.getElementById("message");

/* full name input */
fullName.value = "Full name";
fullName.style.color = "#ccc";
function onFocusName() {
    if (fullName.value == "Full name") {
        fullName.value = "";
        fullName.style.color = "#000";
    }
}
function onBlurName() {
    if (fullName.value == "") {
        fullName.value = "Full name";
        fullName.style.color = "#ccc";
    }
}
/* email input */
email.value = "Email";
email.style.color = "#ccc";
function onFocusEmail() {
    if (email.value == "Email") {
        email.value = "";
        email.style.color = "#000";
    }
}
function onBlurEmail() {
    if (email.value == "") {
        email.value = "Email";
        email.style.color = "#ccc";
    }
}
/* phone input */
phone.value = "phone";
phone.style.color = "#ccc";
function onFocusPhone() {
    if (phone.value == "phone") {
        phone.value = "";
        phone.style.color = "#000";
    }
}
function onBlurPhone() {
    if (phone.value == "") {
        phone.value = "phone";
        phone.style.color = "#ccc";
    }
}
/* message input */
message.value = "message";
message.style.color = "#ccc";
function onFocusMessage() {
    if (message.value == "message") {
        message.value = "";
        message.style.color = "#000";
    }
}
function onBlurMessage() {
    if (message.value == "") {
        message.value = "message";
        message.style.color = "#ccc";
    }
}



/* prevent refresh on submit (contact) */

const contactForm = document.getElementById("contactForm");

const preventRefresh = (myEvent) => {
    myEvent.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    if (fullName == "Full name" || fullName == "" ||
        email == "Email" || email == "" ||
        phone == "phone" || phone == "" ||
        message == "message" || message == "") {
        alert("Please fill out all required fields.");
    }
}

contactForm.addEventListener("submit", preventRefresh);