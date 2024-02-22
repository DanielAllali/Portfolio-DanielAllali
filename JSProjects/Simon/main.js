/* main variables */
const colors = ["red", "blue", "yellow", "green"];
const colorsBlockColors = ["#ca3030", "#3e3ee8", "#e3e326", "#2e862e"];
let colorsSelections = [];
for (let colorss = 0; colorss <= 3; colorss++) {
    /* colors for the blocks + hovers */
    window[colors[colorss]] = document.getElementById(colors[colorss] + "Block");
    window[colors[colorss]].style.backgroundColor = colorsBlockColors[colorss];
    /* clicks for the blocks */
    window[colors[colorss]].addEventListener("click", () => {
        rounds(colors[colorss]);
    });
};

let round;
let selectionTime = 0;
let scoreElement = document.getElementById("score");
let score;
let bestScoreElement = document.getElementById("bestScore");
bestScoreElement.innerHTML = localStorage.getItem("bestscore");
const wrapper = document.getElementById("DONT_CLICK_WRAPPER");
/* main variables */

const showColors = () => {
    wrapper.style.display = "block";
    let time;
    for (time = 0; time <= round; time++) {
        for (let color = 0; color <= 4; color++) {
            if (colorsSelections[time] == colors[color]) {
                const showColorsInner = () => {
                    const colorElement = window[colors[color]];
                    colorElement.style.backgroundColor = "white";
                    setTimeout(() => {
                        colorElement.style.backgroundColor = colorsBlockColors[color];
                    }, 500)
                }
                setTimeout(showColorsInner, 1000 * (time + 1));
            }
        }
    }
}


const lostDiv = document.getElementById("lostDiv");
const rounds = (pickedColor) => {
    wrapper.style.display = "block";
    if (pickedColor == colorsSelections[selectionTime]) {
        selectionTime++;
        wrapper.style.display = "none";
        if (selectionTime == round + 1) {
            selectionTime = 0;
            round++;
            score++;
            scoreElement.innerHTML = score;
            if (score > localStorage.getItem("bestscore")) {
                localStorage.setItem("bestscore", score)
                bestScoreElement.innerHTML = localStorage.getItem("bestscore");
            }
            showColors();
        }
    }
    else {
        lostDiv.style.display = "flex";
        setTimeout(() => {
            lostDiv.style.opacity = "1";
        }, 200)
        document.getElementById("lostScore").innerHTML = score;
        document.getElementById("lostBestScore").innerHTML = localStorage.getItem("bestscore");
    }
}




/* setups */
/* create_Random_Colors_Until_999 */
const createRanColTil999 = () => {
    for (let times = 1; times <= 99999; times++) {
        colorsSelections.push(colors[Math.floor(Math.random() * 4)]);
    };
};
const startBtn = document.getElementById("startBtn");

const startGame = () => {
    colorsSelections = [];
    selectionTime = 0;
    /* create_Random_Colors_Until_999 */
    createRanColTil999();
    /*  */
    round = 0;
    score = 0;
    scoreElement.innerHTML = score;
    if (localStorage.getItem("bestscore") == undefined) {
        localStorage.setItem("bestscore", 0)
    }
    bestScoreElement.innerHTML = localStorage.getItem("bestscore");
    showColors();
    startBtn.innerHTML = "Let me click";
    startBtn.style.width = "18vw";
    startBtn.removeEventListener("click", startGame);
}

startBtn.addEventListener("click", () => {
    wrapper.style.display = "none";
})

startBtn.addEventListener("click", startGame);

const playAgain = () => {
    startGame();
    lostDiv.style.display = "none";
}