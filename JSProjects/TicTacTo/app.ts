/* something global scope for later*/
let checkHowManyClears = 0;


/* ----------------------------local storage save x & circle wins---------------------------- */

if (localStorage.getItem("timesXwin") === null) {
    localStorage.setItem("timesXwin", "0");
}
let timesXwin: number = parseInt(localStorage.getItem("timesXwin") as string);

if (localStorage.getItem("timesCirclewin") === null) {
    localStorage.setItem("timesCirclewin", "0");
}
let timesCirclewin: number = parseInt(localStorage.getItem("timesCirclewin") as string);

const timeXwonElement: HTMLHeadElement = document.getElementById("timeXwonElement") as HTMLHeadElement;
const timeCirclewonElement: HTMLHeadElement = document.getElementById("timeCirclewonElement") as HTMLHeadElement;

const initLocalStorage = () => {
    localStorage.setItem("timesXwin", timesXwin.toString());
    localStorage.setItem("timesCirclewin", timesCirclewin.toString());
    timeXwonElement.innerHTML = localStorage.getItem("timesXwin") as string;
    timeCirclewonElement.innerHTML = localStorage.getItem("timesCirclewin") as string;
}
initLocalStorage();

const restartLocalStorage = () => {
    timesXwin = 0;
    timesCirclewin = 0;
    localStorage.setItem("timesXwin", "0");
    localStorage.setItem("timesCirclewin", "0");
    initLocalStorage();
}
document.getElementById("restartStats")?.addEventListener("click", restartLocalStorage);

/* ----------------------------create board cells array---------------------------- */
let boardCells: [string, string, string, string, string, string, string, string, string] = ["clear", "clear", "clear", "clear", "clear", "clear", "clear", "clear", "clear"];


/* ----------------------------turn---------------------------- */
let turn: string = "x";
const turnElement: HTMLHeadElement = document.getElementById("turnElement") as HTMLHeadElement;

const switchTurn = () => {
    if (turn == "x") {
        turn = "circle";
        turnElement.innerText = "Circle"
        return;
    }
    else {
        turn = "x";
        turnElement.innerText = "X"
        return;
    }
}


/* ----------------------------win conditions---------------------------- */

const winCon1: [number, number, number] = [1, 2, 3];
const winCon2: [number, number, number] = [4, 5, 6];
const winCon3: [number, number, number] = [7, 8, 9];
const winCon4: [number, number, number] = [1, 4, 7];
const winCon5: [number, number, number] = [2, 5, 8];
const winCon6: [number, number, number] = [3, 6, 9];
const winCon7: [number, number, number] = [1, 5, 9];
const winCon8: [number, number, number] = [3, 5, 7];

const winConditions: [Array<number>, Array<number>, Array<number>, Array<number>, Array<number>, Array<number>, Array<number>, Array<number>] = [winCon1, winCon2, winCon3, winCon4, winCon5, winCon6, winCon7, winCon8];



/* ----------------------------events for cells---------------------------- */
/* create variables for cells and images in cells */
for (let i = 1; i <= 9; i++) {
    (window as any)[`cell${i}`] = document.getElementById(`cell${i}`) as HTMLDataElement;
    (window as any)[`cellImg${i}`] = document.getElementById(`cellImg${i}`) as HTMLImageElement;
    (window as any)[`cell${i}`].addEventListener("mouseover", () => { cellHover(i); });
    (window as any)[`cell${i}`].addEventListener("mouseout", () => { cellUnhover(i); });
    (window as any)[`cell${i}`].addEventListener("click", () => { cellClick(i); });
}

/* hovers */
const cellHover = (cell: number) => {
    if (boardCells[cell - 1] == "clear") {
        (window as any)[`cellImg${cell}`].style.display = "block";
        (window as any)[`cellImg${cell}`].src = `./images/${turn}Hover.png`;
    }
}
const cellUnhover = (cell: number) => {
    if (boardCells[cell - 1] == "clear") {
        (window as any)[`cellImg${cell}`].style.display = "none";
    }
}
/* clicks */

const winPopup: HTMLDivElement = document.getElementById("winPopup") as HTMLDivElement;
const winner: HTMLHeadElement = document.getElementById("winner") as HTMLHeadElement;

const cellClick = (cell: number) => {
    if (boardCells[cell - 1] == "clear") {
        boardCells[cell - 1] = turn;
        (window as any)[`cell${cell}`].style.cursor = "not-allowed";
        (window as any)[`cellImg${cell}`].src = `./images/${turn}.png`;

        /* if won */
        for (let i = 0; i < 8; i++) {
            let winCondition = winConditions[i];
            if (boardCells[winCondition[0] - 1] == turn && boardCells[winCondition[1] - 1] == turn && boardCells[winCondition[2] - 1] == turn) {
                winner.innerText = `${turn} Won!`;
                winPopup.style.display = "flex";
                setTimeout(() => {
                    winPopup.style.opacity = "1";
                    winPopup.style.top = "0";
                    winPopup.style.backdropFilter = "blur(10px)"
                }, 1)
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
                winPopup.style.backdropFilter = "blur(10px)"
            }, 1)
        }
        else {
            checkHowManyClears = 0;
        }



        switchTurn();
    }
}




/* ----------------------------restart game---------------------------- */
const restartGame = () => {
    turn = "x";
    turnElement.innerText = "x";
    boardCells = ["clear", "clear", "clear", "clear", "clear", "clear", "clear", "clear", "clear"];
    checkHowManyClears = 0;
    for (let i = 1; i <= 9; i++) {
        (window as any)[`cellImg${i}`].style.display = "none";
        (window as any)[`cell${i}`].style.cursor = "pointer";
    }
    winPopup.style.display = "none";
    winPopup.style.opacity = "0";
    winPopup.style.top = "-100px";
    winPopup.style.backdropFilter = "blur(0)"
}

/* ----------------------------new game btn---------------------------- */

document.getElementById("newGameBtn")?.addEventListener("click", restartGame);
