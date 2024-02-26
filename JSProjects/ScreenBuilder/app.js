"use strict";
class Elemment {
    constructor(elementType, width, height, content, bgc, textColor, fontSize, font) {
        this.elementType = elementType;
        this.width = width;
        this.height = height;
        this.content = content;
        this.bgc = bgc;
        this.textColor = textColor;
        this.fontSize = fontSize;
        this.font = font;
    }
}
/* -----------Create inputs errors for inputs and button----------- */
/* inputs and inputs errors */
const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const BgcInput = document.getElementById("BgcInput");
const textColorInput = document.getElementById("textColorInput");
const fontSizeInput = document.getElementById("fontSizeInput");
const contentInput = document.getElementById("contentInput");
const fontInput = document.getElementById("fontInput");
const elementShapeInput = document.getElementById("elementShapeInput");
const widthInputError = document.getElementById("widthInputError");
const heightInputError = document.getElementById("heightInputError");
const BgcInputError = document.getElementById("BgcInputError");
const textColorInputError = document.getElementById("textColorInputError");
const fontSizeInputError = document.getElementById("fontSizeInputError");
const contentInputError = document.getElementById("contentInputError");
/*  Declare an array of objects, each containing an input and an error property*/
const inputsArr = [
    { input: widthInput, error: widthInputError },
    { input: heightInput, error: heightInputError },
    { input: BgcInput, error: BgcInputError },
    { input: textColorInput, error: textColorInputError },
    { input: fontSizeInput, error: fontSizeInputError },
    { input: contentInput, error: contentInputError }
];
const addElementBtn = document.getElementById("addElementBtn");
addElementBtn.addEventListener("click", () => { checkInputs(); });
/* ---------------------- */
/* ----------------------check inputs funtion---------------------- */
const checkInputs = () => {
    /* if inputs are eligible */
    let eligibleElement = true;
    for (let i = 0; i <= inputsArr.length - 1; i++) {
        inputsArr[i].error.style.display = "none";
        if (inputsArr[i].input.value == "") {
            inputsArr[i].error.style.display = "block";
            inputsArr[i].error.innerText = "can't be empty";
            eligibleElement = false;
        }
    }
    for (let i = 0; i <= 1; i++) {
        if (Number(inputsArr[i].input.value) > 1000 || Number(inputsArr[i].input.value) < 1 || isNaN(Number(inputsArr[i].input.value))) {
            inputsArr[i].error.style.display = "block";
            inputsArr[i].error.innerText = "only number between 1-1000";
            eligibleElement = false;
        }
    }
    if (Number(inputsArr[4].input.value) > 25 || Number(inputsArr[4].input.value) < 1 || isNaN(Number(inputsArr[4].input.value))) {
        inputsArr[4].error.style.display = "block";
        inputsArr[4].error.innerText = "only number between 1-25";
        eligibleElement = false;
    }
    if (eligibleElement == true) {
        createElement();
    }
};
/* ---------------------- create element funtion---------------------- */
/* create element of all cells */
for (let i = 1; i <= 25; i++) {
    window[`cell${i}`] = document.getElementById(`cell${i}`);
}
let numberOfElements = 0;
let numberOfCells = 25;
const createElement = () => {
    numberOfElements++;
    let elementObj = new Elemment(elementShapeInput.value, widthInput.value, heightInput.value, contentInput.value, BgcInput.value, textColorInput.value, fontSizeInput.value, fontInput.value);
    let element = document.createElement("div");
    element.style.width = `${elementObj.width}px`;
    element.style.height = `${elementObj.height}px`;
    element.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; height: 100%;"> <h1>${elementObj.content}</h1> </div>`;
    element.style.backgroundColor = elementObj.bgc;
    element.style.color = elementObj.textColor;
    element.style.fontSize = `${elementObj.fontSize}pt`;
    element.style.fontFamily = elementObj.font;
    if (elementObj.elementType == "Circle") {
        element.style.borderRadius = "50%";
    }
    else if (elementObj.elementType == "Triangle") {
        element.style.width = "0";
        element.style.height = "0";
        element.style.borderLeft = `${Number(elementObj.width) / 2}px solid transparent`;
        element.style.borderRight = `${Number(elementObj.width) / 2}px solid transparent`;
        element.style.borderBottom = `${Number(elementObj.height)}px solid ${elementObj.bgc}`;
        element.style.clipPath = `polygon(50% 0%, 0% 100%, 100% 100%)`;
    }
    /* remove cells border */
    for (let i = 1; i <= numberOfCells; i++) {
        window[`cell${i}`].style.border = "none";
    }
    /* create new cells after they are full */
    let cellsTable = document.getElementById("cellsTable");
    if (numberOfElements > numberOfCells) {
        window[`tr${Math.ceil(numberOfElements / 5)}`] = document.createElement("tr");
        for (let i = 0; i <= 4; i++) {
            window[`cell${numberOfElements + i}`] = document.createElement("td");
            window[`tr${Math.ceil(numberOfElements / 5)}`].appendChild(window[`cell${numberOfElements + i}`]);
        }
        cellsTable.appendChild(window[`tr${Math.ceil(numberOfElements / 5)}`]);
        numberOfCells += 5;
    }
    window[`cell${numberOfElements}`].appendChild(element);
};
