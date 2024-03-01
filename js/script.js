let leftOperand = '';
let rightOperand = '';
let operator = '';
let result = '';

const displayDiv = document.querySelector('.display');

const numberButtons = document.querySelectorAll('.number-buttons button');
numberButtons.forEach(button => button.addEventListener('click', (e) => {
    let number = e.target.innerText;
    if (operator === '') {
        if (result) {
            displayDiv.innerText = '';
            result = '';
        }
        leftOperand += number;
        displayDiv.innerText = leftOperand;
    }
    else {
        rightOperand += number;
        displayDiv.innerText = rightOperand;
    }
}));

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    clearOperatorAndOperands();
    displayDiv.innerText = '0';
});

const arithmeticButtons = document.querySelectorAll('.arithmetic-buttons');
arithmeticButtons.forEach(button => button.addEventListener('click', (e) => {
    let op = e.target.innerText;
    if (op === '=') {
        if (leftOperand === '' || rightOperand === '') return;
        result = String(operate(operator, leftOperand, rightOperand));
        displayDiv.innerText = result;
        clearOperatorAndOperands();
    }
    else {
        operator = op;
    }
}));

function operate(operator, leftOperand, rightOperand) {
    let leftOp = Number(leftOperand);
    let rightOp = Number(rightOperand);
    switch(operator) {
        case '+':
            return add(leftOp, rightOp);
        case '-':
            return subtract(leftOp, rightOp);
        case '*':
            return multiply(leftOp, rightOp);
        case '/':
            return divide(leftOp, rightOp);
    }
}

function add(leftOperand, rightOperand) {
    return leftOperand + rightOperand;
}

function subtract(leftOperand, rightOperand) {
    return leftOperand - rightOperand;
}

function multiply(leftOperand, rightOperand) {
    return leftOperand * rightOperand;
}

function divide(leftOperand, rightOperand) {
    return leftOperand / rightOperand;
}

function clearOperatorAndOperands() {
    leftOperand = rightOperand = operator = '';
}