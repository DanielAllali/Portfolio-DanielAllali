/* loading animation / loading disappear rest of page appears */
/* loading animation / loading disappear rest of page appears */
let loading = document.getElementById("loadingAnimationDiv");
let info = document.getElementById("information");
let imgSec = document.getElementById("imageSec");
info.style.display = "none";
imgSec.style.display = "none";
function loadingDisappear() {
    loading.style.opacity = "0";
    info.style.display = "flex";
    imgSec.style.display = "flex";
    setTimeout(function () {
        loading.style.display = "none";
        info.style.opacity = "1";
        imgSec.style.opacity = "1";
    }, 1000)
}
setTimeout(loadingDisappear, 2000)
/* forms stuff */
/* forms stuff */
let username = document.formm.fullName;
let gmail = document.formm.email;
username.value = "Name";
username.style.color = "#ccc";
gmail.value = "cool.example@gmail.com";
gmail.style.color = "#ccc";

function nameFocus() {
    if (username.value == "Name") {
        username.value = "";
        username.style.color = "black";
    }
}
function nameBlur() {
    if (username.value == "") {
        username.value = "Name";
        username.style.color = "#ccc";
    }
}
function emailFocus() {
    if (gmail.value == "cool.example@gmail.com") {
        gmail.value = "";
        gmail.style.color = "black";
    }
}
function emailBlur() {
    if (gmail.value == "") {
        gmail.value = "cool.example@gmail.com";
        gmail.style.color = "#ccc";
    }
}