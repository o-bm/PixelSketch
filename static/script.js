const DEF_COLOR = '#000000';
const DEF_MODE = 'color';
const DEF_SIZE = 16;

let currentColor = DEF_COLOR
let currentSize = DEF_SIZE
let currentMode = DEF_MODE

// Checking if mouse is pressed on the body
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const grid = document.getElementById('grid')
function makeGrid(size){
    // Clearing the grid
    grid.innerHTML = '';
    // Making the grid template
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    // Adding the squares
    for (let i=0; i<size*size; i++){
        const square = document.createElement('div')
        // Adding event listeners to the squares
        square.addEventListener('mouseover', changeColor)
        square.addEventListener('mousedown', changeColor)
        square.classList.add('square')
        grid.appendChild(square)
    }
}

function changeColor(event){
    if (event.type == 'mouseover' && !mouseDown) return
    if (currentMode == 'color') {
        event.target.style.backgroundColor = currentColor
    }
}


function clearGrid(){
    grid.innerHTML = '';
}
makeGrid(64);
