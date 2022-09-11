"use strict";

function add(a, b = 0) {
  return a + b;
}

function subtract(a, b = 0) {
  return a - b;
}

function multiply(a, b = 1) {
  return a * b;
}

function divide(a, b = 1) {
  if (b === 0) return 'cannot divide by zero';
  return a / b;
}

function splitDisplay(display) {
  const result = display.match(/^(-?\d+\.?\d*(?:e\+\d+)?)([\+\-\*\/])(.*)/);
  result.shift();
  if (result[2] === '') result.pop();
  return result.map(r => Number.isFinite(+r) ? +r : r);
}

function operate(a, operator, b) {
  if (/^\d+\.?\d*[\+\-\*\/]$/.test(b)) {
    b = Number(b.slice(0, -1));
  }
  else if (/^\d+\.?\d*[\+\-\*\/]\d*\.*\d+/.test(b)) {
    operate(...splitDisplay(b));
  }

  if (operator === '+') return add(a, b);
  else if (operator === '-') return subtract(a, b);
  else if (operator === '*') return multiply(a, b);
  else if (operator === '/') return divide(a, b);
}

const display = document.querySelector('p');
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', () => {
  if (button.textContent === 'clear') {
    display.textContent = '';
  }
  else if (button.classList.contains('backspace')) {
    display.textContent = display.textContent.slice(0, -1);
  }
  else if (button.textContent === '=') {
    display.textContent = operate(...splitDisplay(display.textContent)); //TODO round it to 30 significant digits
  }
  else if (display.textContent.length === 31) {
    return;
  }
  else if (button.textContent === '.' && /\.\d*$/.test(display.textContent)) {
    return;
  }
  else if (/[\-\+]/.test(button.textContent) && !/[\+\-\*\/][\-\+]$/.test(display.textContent)) {
    display.textContent += button.textContent;
  }
  else if (/[\+\-\*\/]$/.test(display.textContent) && /[\+\-\*\/]/.test(button.textContent)) {
    return;
  }
  else {
    display.textContent += button.textContent; // TODO make scientific notation work
  }
}));
