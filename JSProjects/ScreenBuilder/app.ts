class Elemment {
    elementType: string;
    width: string;
    height: string;
    content: string;
    bgc: string;
    textColor: string;
    fontSize: string;
    font: string;
    constructor(elementType: string, width: string, height: string, content: string, bgc: string, textColor: string, fontSize: string, font: string) {
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
const widthInput: HTMLInputElement = document.getElementById("widthInput") as HTMLInputElement;
const heightInput: HTMLInputElement = document.getElementById("heightInput") as HTMLInputElement;
const BgcInput: HTMLInputElement = document.getElementById("BgcInput") as HTMLInputElement;
const textColorInput: HTMLInputElement = document.getElementById("textColorInput") as HTMLInputElement;
const fontSizeInput: HTMLInputElement = document.getElementById("fontSizeInput") as HTMLInputElement;
const contentInput: HTMLTextAreaElement = document.getElementById("contentInput") as HTMLTextAreaElement;
const fontInput: HTMLSelectElement = document.getElementById("fontInput") as HTMLSelectElement;
const elementShapeInput: HTMLSelectElement = document.getElementById("elementShapeInput") as HTMLSelectElement;

const widthInputError: HTMLHeadElement = document.getElementById("widthInputError") as HTMLHeadElement;
const heightInputError: HTMLHeadElement = document.getElementById("heightInputError") as HTMLHeadElement;
const BgcInputError: HTMLHeadElement = document.getElementById("BgcInputError") as HTMLHeadElement;
const textColorInputError: HTMLHeadElement = document.getElementById("textColorInputError") as HTMLHeadElement;
const fontSizeInputError: HTMLHeadElement = document.getElementById("fontSizeInputError") as HTMLHeadElement;
const contentInputError: HTMLTextAreaElement = document.getElementById("contentInputError") as HTMLTextAreaElement;

/*  Declare an array of objects, each containing an input and an error property*/
const inputsArr: Array<{ input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, error: HTMLHeadElement }> = [
    { input: widthInput, error: widthInputError },
    { input: heightInput, error: heightInputError },
    { input: BgcInput, error: BgcInputError },
    { input: textColorInput, error: textColorInputError },
    { input: fontSizeInput, error: fontSizeInputError },
    { input: contentInput, error: contentInputError }
];

const addElementBtn: HTMLButtonElement = document.getElementById("addElementBtn") as HTMLButtonElement;
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

}
/* ---------------------- create element funtion---------------------- */
/* create element of all cells */
for (let i = 1; i <= 25; i++) {
    (window as any)[`cell${i}`] = document.getElementById(`cell${i}`) as HTMLDataElement;
}


let numberOfElements = 0;
let numberOfCells = 25;
const createElement = () => {
    numberOfElements++;
    let elementObj: Elemment = new Elemment(elementShapeInput.value, widthInput.value, heightInput.value, contentInput.value, BgcInput.value, textColorInput.value, fontSizeInput.value, fontInput.value);
    let element: HTMLDivElement = document.createElement("div");
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
        (window as any)[`cell${i}`].style.border = "none";
    }

    /* create new cells after they are full */
    let cellsTable: HTMLTableElement = document.getElementById("cellsTable") as HTMLTableElement;
    if (numberOfElements > numberOfCells) {
        (window as any)[`tr${Math.ceil(numberOfElements / 5)}`] = document.createElement("tr");
        for (let i = 0; i <= 4; i++) {
            (window as any)[`cell${numberOfElements + i}`] = document.createElement("td");
            (window as any)[`tr${Math.ceil(numberOfElements / 5)}`].appendChild((window as any)[`cell${numberOfElements + i}`]);
        }
        cellsTable.appendChild((window as any)[`tr${Math.ceil(numberOfElements / 5)}`]);
        numberOfCells += 5;
    }
    (window as any)[`cell${numberOfElements}`].appendChild(element);
}

