const pixel = document.createElement("div");
const board = document.querySelector(".board");

pixel.classList.add("pixel");
pixel.classList.add("unselectable");
pixel.style.cssText = "background-color: black;"
pixel.setAttribute("draggable", false);

let size = 16;
const color = [0, 0, 0];
let selectedColor = "white";

function createBoard(boardSize) {
    const boardMax = 576;
    let pixelMax = boardMax / boardSize;
    console.log(pixelMax);
    pixel.style.cssText += "width:" + pixelMax + "px ;height: " + pixelMax + "px;";
    boardSize = boardSize ** 2;
    for (let i = 0; i < boardSize; i++) {
        board.appendChild(pixel.cloneNode(true));
    }
}

createBoard(size);



let isHolding = false;
let isColoring = false;

board.addEventListener("mousedown", () => {
    isHolding = true;
})

board.addEventListener("mouseup", () => {
    isHolding = false;
})

function randColor()
{
    return Math.floor(Math.random() * 255);
}

function draw(pixel){

    if (isColoring && isHolding) {
        pixel.style.background = "rgb(" + randColor() +"," + randColor() + "," + randColor() + ")";
    }
    else if (isHolding) {
        pixel.style.backgroundColor = selectedColor
    }

}

function addBoardEvents() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
        pixel.addEventListener("mouseover", () => {
            draw(pixel)
        })
        pixel.addEventListener("click", () => {
            draw(pixel)
        })

    })
}

addBoardEvents();


const clearBoard = document.querySelector(".clearBtn");
clearBoard.addEventListener("click", () => {
    board.innerHTML = "";
    createBoard(size);
    addBoardEvents();
})

const textBox = document.querySelector(".textBox");
const changeSize = document.querySelector(".sizeBtn");


changeSize.addEventListener("click", () => {
    size = parseInt(textBox.value);
    board.innerHTML = "";
    createBoard(Math.min(Math.max(size, 1), 100));
    addBoardEvents();
})

let clickCounter = 0;

const colorBtn = document.querySelector(".rainbowBtn");
colorBtn.addEventListener("click", () => {
    clickCounter++;
    isColoring = true;
    if(clickCounter % 2 == 0)
    {
        clickCounter = 0;
        isColoring = false;
    }
})


const colorPicker = document.querySelector("#colorPicker"); 

function changeColor(e){
    selectedColor = e.target.value;
}

colorPicker.addEventListener("input", changeColor);

