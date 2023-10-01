/* loading animation / loading disappear rest of page appears */
/* loading animation / loading disappear rest of page appears */
let loading = document.getElementById("loadingAnimationDiv");
let upSection = document.getElementById("startSection");
let downSection = document.getElementById("infoSection");
function loadingDisappear() {
    loading.style.opacity = "0";
    upSection.style.display = "flex";
    downSection.style.display = "flex";
    setTimeout(function () {
        loading.style.display = "none";
        upSection.style.opacity = "1";
        downSection.style.opacity = "1";
    }, 1000)
}
setTimeout(loadingDisappear, 2000)
/* forms */
/* forms */
let gmail = document.formm.email;
let username = document.formm.fullName;
gmail.value = "Cool.example@gmail.com";
gmail.style.color = "#ccc";
username.value = "Name";
username.style.color = "#ccc";
function gmailOnFocus() {
    if (gmail.value == "Cool.example@gmail.com") {
        gmail.value = "";
        gmail.style.color = "#011560";
    }
}
function gmailOnBlur() {
    if (gmail.value == "") {
        gmail.value = "Cool.example@gmail.com";
        gmail.style.color = "#ccc";
        gmail.style.backgroundColor = "#F6F6F6";
    }
    else {
        gmail.style.backgroundColor = "#E5EEFF";
    }
}
function usernameOnFocus() {
    if (username.value == "Name") {
        username.value = "";
        username.style.color = "#011560";
    }
}
function usernameOnBlur() {
    if (username.value == "") {
        username.value = "Name";
        username.style.color = "#ccc";
        username.style.backgroundColor = "#F6F6F6";
    }
    else {
        username.style.backgroundColor = "#E5EEFF";
    }
}