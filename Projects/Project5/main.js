/* loading animation / loading disappear rest of page appears */
/* loading animation / loading disappear rest of page appears */
let loading = document.getElementById("loadingAnimationDiv");
let cont = document.getElementById("container");
cont.style.display = "none";
function loadingDisappear() {
    loading.style.opacity = "0";
    cont.style.display = "flex";
    setTimeout(function () {
        loading.style.display = "none";
        cont.style.opacity = "1";
    }, 1000)
}
setTimeout(loadingDisappear, 2000)