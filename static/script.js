const DEF_COLOR = '#000000';
const DEF_MODE = 'color';
const DEF_SIZE = 16;
const DEBOUNCE_DELAY = 20; // Delay in milliseconds for debounce

let currentColor = DEF_COLOR;
let currentSize = DEF_SIZE;
let currentMode = DEF_MODE;

let mouseDown = false;
document.body.addEventListener('mousedown', () => (mouseDown = true));
document.body.addEventListener('mouseup', () => (mouseDown = false));

const grid = document.querySelector('#grid');
const colorWheel = document.getElementById('colorWheel');
const colorModeButton = document.getElementById('colorMode');
const rainbowModeButton = document.getElementById('rainbowMode');
const eraserModeButton = document.getElementById('eraserMode');
const clearModeButton = document.getElementById('clearMode');


colorWheel.addEventListener('input', (event) => {
  currentColor = event.target.value; // Update currentColor with selected color
});

colorWheel.oninput = (e) => setCurrentColor(e.target.value)

function setColor (color){
  currentColor = color
}

function makeGrid(size) {
  // Clearing the grid
  grid.innerHTML = '';

  // Handling invalid size input
  if (isNaN(size) || size < 1) {
    size = DEF_SIZE;
    console.error('Invalid size input. Using default size instead.');
  }

  // Making the grid template
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // Adding the squares
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.addEventListener('mouseover', debounce(changeColor, DEBOUNCE_DELAY));
    square.addEventListener('mousedown', debounce(changeColor, DEBOUNCE_DELAY));
    square.classList.add('square');
    grid.appendChild(square);
  }
}

function changeColor(event) {
  if (event.type === 'mouseover' && !mouseDown) return;
  if (currentMode === 'color') {
    event.target.style.backgroundColor = currentColor;
  }
}

function clearGrid() {
  grid.innerHTML = '';

}

makeGrid(32);

// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
