"use strict";
var _a, _b;
/* something global scope for later*/
let checkHowManyClears = 0;
/* ----------------------------local storage save x & circle wins---------------------------- */
if (localStorage.getItem("timesXwin") === null) {
    localStorage.setItem("timesXwin", "0");
}
let timesXwin = parseInt(localStorage.getItem("timesXwin"));
if (localStorage.getItem("timesCirclewin") === null) {
    localStorage.setItem("timesCirclewin", "0");
}
let timesCirclewin = parseInt(localStorage.getItem("timesCirclewin"));
const timeXwonElement = document.getElementById("timeXwonElement");
const timeCirclewonElement = document.getElementById("timeCirclewonElement");
const initLocalStorage = () => {
    localStorage.setItem("timesXwin", timesXwin.toString());
    localStorage.setItem("timesCirclewin", timesCirclewin.toString());
    timeXwonElement.innerHTML = localStorage.getItem("timesXwin");
    timeCirclewonElement.innerHTML = localStorage.getItem("timesCirclewin");
};
initLocalStorage();
const restartLocalStorage = () => {
    timesXwin = 0;
    timesCirclewin = 0;
    localStorage.setItem("timesXwin", "0");
    localStorage.setItem("timesCirclewin", "0");
    initLocalStorage();
};
(_a = document.getElementById("restartStats")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", restartLocalStorage);
/* ----------------------------create board cells array---------------------------- */
let boardCells = ["clear", "clear", "clear", "clear", "clear", "clear", "clear", "clear", "clear"];
/* ----------------------------turn---------------------------- */
let turn = "x";
const turnElement = document.getElementById("turnElement");
const switchTurn = () => {
    if (turn == "x") {
        turn = "circle";
        turnElement.innerText = "Circle";
        return;
    }
    else {
        turn = "x";
        turnElement.innerText = "X";
        return;
    }
};
/* ----------------------------win conditions---------------------------- */
const winCon1 = [1, 2, 3];
const winCon2 = [4, 5, 6];
const winCon3 = [7, 8, 9];
const winCon4 = [1, 4, 7];
const winCon5 = [2, 5, 8];
const winCon6 = [3, 6, 9];
const winCon7 = [1, 5, 9];
const winCon8 = [3, 5, 7];
const winConditions = [winCon1, winCon2, winCon3, winCon4, winCon5, winCon6, winCon7, winCon8];
/* ----------------------------events for cells---------------------------- */
/* create variables for cells and images in cells */
for (let i = 1; i <= 9; i++) {
    window[`cell${i}`] = document.getElementById(`cell${i}`);
    window[`cellImg${i}`] = document.getElementById(`cellImg${i}`);
    window[`cell${i}`].addEventListener("mouseover", () => { cellHover(i); });
    window[`cell${i}`].addEventListener("mouseout", () => { cellUnhover(i); });
    window[`cell${i}`].addEventListener("click", () => { cellClick(i); });
}
/* hovers */
const cellHover = (cell) => {
    if (boardCells[cell - 1] == "clear") {
        window[`cellImg${cell}`].style.display = "block";
        window[`cellImg${cell}`].src = `./images/${turn}Hover.png`;
    }
};
const cellUnhover = (cell) => {
    if (boardCells[cell - 1] == "clear") {
        window[`cellImg${cell}`].style.display = "none";
    }
};
/* clicks */
const winPopup = document.getElementById("winPopup");
const winner = document.getElementById("winner");
const cellClick = (cell) => {
    if (boardCells[cell - 1] == "clear") {
        boardCells[cell - 1] = turn;
        window[`cell${cell}`].style.cursor = "not-allowed";
        window[`cellImg${cell}`].src = `./images/${turn}.png`;
        /* if won */
        for (let i = 0; i < 8; i++) {
            let winCondition = winConditions[i];
            if (boardCells[winCondition[0] - 1] == turn && boardCells[winCondition[1] - 1] == turn && boardCells[winCondition[2] - 1] == turn) {
                winner.innerText = `${turn} Won!`;
                winPopup.style.display = "flex";
                setTimeout(() => {
                    winPopup.style.opacity = "1";
                    winPopup.style.top = "0";
                    winPopup.style.backdropFilter = "blur(10px)";
                }, 1);
                switch (turn) {
                    case "x":
                        timesXwin++;
                        initLocalStorage();
                        break;
                    case "circle":
                        timesCirclewin++;
                        initLocalStorage();
                        break;
                }
                return;
            }
        }
        /* check if draw */
        for (let i = 0; i <= 8; i++) {
            if (boardCells[i] != "clear") {
                checkHowManyClears++;
            }
        }
        if (checkHowManyClears == 9) {
            winner.innerHTML = "Draw!";
            winPopup.style.display = "flex";
            setTimeout(() => {
                winPopup.style.opacity = "1";
                winPopup.style.top = "0";
                winPopup.style.backdropFilter = "blur(10px)";
            }, 1);
        }
        else {
            checkHowManyClears = 0;
        }
        switchTurn();
    }
};
/* ----------------------------restart game---------------------------- */
const restartGame = () => {
    turn = "x";
    turnElement.innerText = "x";
    boardCells = ["clear", "clear", "clear", "clear", "clear", "clear", "clear", "clear", "clear"];
    checkHowManyClears = 0;
    for (let i = 1; i <= 9; i++) {
        window[`cellImg${i}`].style.display = "none";
        window[`cell${i}`].style.cursor = "pointer";
    }
    winPopup.style.display = "none";
    winPopup.style.opacity = "0";
    winPopup.style.top = "-100px";
    winPopup.style.backdropFilter = "blur(0)";
};
/* ----------------------------new game btn---------------------------- */
(_b = document.getElementById("newGameBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", restartGame);
