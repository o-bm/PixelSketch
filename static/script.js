const DEF_COLOR = '#000000';
const ERA_COLOR = '#FFFFFF'
const DEF_MODE = 'color';
const DEF_SIZE = 16;
const DEBOUNCE_DELAY = 20; // Delay in milliseconds for debounce

let currentColor = DEF_COLOR;
let previousColor = DEF_COLOR; 
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
const modeText = document.getElementById('modeText');
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');

colorWheel.addEventListener('input', (event) => {
  currentColor = event.target.value; // Update currentColor with selected color
  if (currentMode == DEF_MODE) {
    previousColor = currentColor
  }
});

colorModeButton.addEventListener('click', () => {
  currentMode = DEF_MODE
  currentColor = previousColor
  modeText.textContent = 'Color Mode Activated!';
})

rainbowModeButton.addEventListener('click', () => {
  currentMode = 'rainbow'
  modeText.textContent = 'Rainbow Mode Activated!';
})

eraserModeButton.addEventListener('click', () => {  
  currentMode = 'eraser'
  modeText.textContent = 'Eraser Mode Activated!';
})

clearModeButton.addEventListener('click', () => {
  grid.innerHTML = '';
  makeGrid(currentSize)
})

sizeSlider.addEventListener('input', () => {
  const newSize = sizeSlider.value;
  sizeValue.textContent = `${newSize} x ${newSize}`;
  makeGrid(newSize);
});


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
  else if (currentMode=='color') {
    event.target.style.backgroundColor = currentColor;
    
  }
  else if (currentMode == 'rainbow') {
    const r = Math.floor(Math.random() * 256); // Random number between 0 and 255 for red
    const g = Math.floor(Math.random() * 256); // Random number between 0 and 255 for green
    const b = Math.floor(Math.random() * 256); // Random number between 0 and 255 for blue
    currentColor = `rgb(${r}, ${g}, ${b})`;
    event.target.style.backgroundColor = currentColor;
  }
  else if (currentMode == 'eraser') {
    event.target.style.backgroundColor = ERA_COLOR;
  }
}


makeGrid(DEF_SIZE);

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
