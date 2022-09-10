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
  if (b === 0) return 'cann0t divide by zer0';
  return a / b;
}

function operate(operator, a, b) {
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
    return; //TODO operate()
  }
  else if (display.textContent.length === 30) {
    return;
  }
  else if (button.textContent === '.' && /\.\d*$/.test(display.textContent)) {
    return;
  }
  else {
    display.textContent += button.textContent;
  }
}));
