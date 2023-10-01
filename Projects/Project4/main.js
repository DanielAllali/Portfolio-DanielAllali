/* loading animation / loading disappear rest of page appears */
/* loading animation / loading disappear rest of page appears */
let loading = document.getElementById("loadingAnimationDiv");
let upperS = document.getElementById("upperSec");
let footerr = document.getElementById("footer");
let upline = document.getElementById("upperLineHr");
let downline = document.getElementById("downHr");
upperS.style.display = "none";
footerr.style.display = "none";
upline.style.display = "none";
downline.style.display = "none";
function loadingDisappear() {
    loading.style.opacity = "0";
    upperS.style.display = "flex";
    footerr.style.display = "flex";
    upline.style.display = "block";
    downline.style.display = "block";
    setTimeout(function () {
        loading.style.display = "none";
        upperS.style.opacity = "1";
        footerr.style.opacity = "1";
        upline.style.opacity = "1";
        downline.style.opacity = "1";
    }, 1000)
}
setTimeout(loadingDisappear, 2000)