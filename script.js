"use strict";

function add(a, b = 0) {
  b = reOperate(b);
  return a + b;
}

function subtract(a, b = 0) {
  b = reOperate(b);
  return a - b;
}

function multiply(a, b = 1) {
  b = reOperate(b);
  return a * b;
}

function divide(a, b = 1) {
  b = reOperate(b);
  if (b === 0) return 'cannot divide by zero';
  return a / b;
}

function displayToArray(display) {
  let result =
    [...display.matchAll(/([\-\+]?(?:\d+\.?\d*|\d*\.\d+)(?:e\+\d+)?)([\+\-\*\/])?/g)];
  result.forEach(r => r.shift());
  result = result.reduce((previousVal, currentVal) => previousVal.concat(currentVal), []);
  return result.map(r => r && Number.isFinite(+r) ? +r : r);
}

function operate(a, operator, ...b) {
  if (operator === '+') return add(a, b);
  else if (operator === '-') return subtract(a, b);
  else if (operator === '*') return multiply(a, b);
  else if (operator === '/') return divide(a, b);
}

function reOperate(expression) {
  if (expression.length > 2) return operate(...expression);
  if (expression.length > 1) return expression[0];
  return expression[0];
}

const display = document.querySelector('p');
const buttons = document.querySelectorAll('button');
window.addEventListener('keydown', e =>
  Array.from(buttons).find(btn =>
    btn.textContent === e.key || btn.id === e.key).click());
buttons.forEach(button => button.addEventListener('click', () => {
  if (display.textContent.length === 31) {
    return;
  }
  else if (button.textContent === 'clear') {
    display.textContent = '';
  }
  else if (button.id === 'Backspace') {
    display.textContent = display.textContent.slice(0, -1);
  }
  else if (button.textContent === '=') {
    display.textContent = operate(...displayToArray(display.textContent));
  }
  else if (button.textContent === '.' && /\.\d*$/.test(display.textContent)) {
    return; // don't allow double decimals
  }
  else if (/\-\+\*\//.test(button.textContent) && /^(\.|.*\D\.)$/.test(display.textContent)) {
    return; // don't allow lone decimals
  }
  else if (/[\-\+]/.test(button.textContent) && (/[\+\-\*\/][\-\+]$/.test(display.textContent) ||
    /^[\+\-]$/.test(display.textContent))) {
    return; // don't allow more than one + or - after a /*-+ or at the very start
  }
  else if (/[\*\/]/.test(button.textContent) && (/[\+\-*\/]$/.test(display.textContent))) {
    return; // don't allow another / or * after -+/*
  }
  else if (/[\*\/]/.test(button.textContent) && display.textContent === '') {
    return; // don't allow the first characters to be * or /
  }
  else {
    display.textContent += button.textContent;
  }
}));
