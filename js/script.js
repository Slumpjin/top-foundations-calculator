const calculator = {
    leftOperand: '',
    rightOperand: '',
    operator: '',
    result:'',

    calculate() {
        let leftOp = Number(this.leftOperand);
        let rightOp = Number(this.rightOperand);

        switch(this.operator) {
            case '+':
                return this.add(leftOp, rightOp);
            case '-':
                return this.subtract(leftOp, rightOp);
            case '*':
                return this.multiply(leftOp, rightOp);
            case '/':
                return this.divide(leftOp, rightOp);
        }
    },

    add(leftOperand, rightOperand) {
        return leftOperand + rightOperand;
    },
    
    subtract(leftOperand, rightOperand) {
        return leftOperand - rightOperand;
    },
    
    multiply(leftOperand, rightOperand) {
        return leftOperand * rightOperand;
    },
    
    divide(leftOperand, rightOperand) {
        return leftOperand / rightOperand;
    },
    
    clearOperatorAndOperands() {
        this.leftOperand = this.rightOperand = this.operator = '';
    },
}

const displayDiv = document.querySelector('.display');

const numberButtons = document.querySelectorAll('.number-buttons button');
numberButtons.forEach(button => button.addEventListener('click', (e) => {
    const number = e.target.innerText;
    if (calculator.operator === '') {
        if (calculator.result) {
            // resets the calculator if a number is clicked after a result is
            // calculated
            displayDiv.innerText = '';
            calculator.result = '';
        }
        calculator.leftOperand += number;
        displayDiv.innerText = calculator.leftOperand;
    }
    else {
        calculator.rightOperand += number;
        displayDiv.innerText = calculator.rightOperand;
    }
}));

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    calculator.clearOperatorAndOperands();
    displayDiv.innerText = '0';
});

const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', () => {
    const displayDivTextLength = displayDiv.innerText.length;
    if (calculator.leftOperand !== '' || calculator.rightOperand !== '') {
        const slicedNumber = displayDiv.innerText.slice(0, displayDivTextLength - 1);
        displayDiv.innerText = slicedNumber;
        if (displayDivTextLength === 1) displayDiv.innerText = '0';
        if (calculator.operator === '') {
            calculator.leftOperand = String(Number(slicedNumber));
        }
        else {
            calculator.rightOperand = String(Number(slicedNumber));
        }
    }
});

const arithmeticButtons = document.querySelectorAll('.arithmetic-buttons');
arithmeticButtons.forEach(button => button.addEventListener('click', (e) => {
    if (calculator.leftOperand === '') return;

    let op = e.target.innerText;
    if (op === '=') {
        if (calculator.leftOperand === '' || calculator.rightOperand === '') return;
        calculator.result = String(calculator.calculate());
        displayDiv.innerText = calculator.result;
        calculator.clearOperatorAndOperands();
    }
    else if (calculator.leftOperand !== '' && calculator.rightOperand !== '' && op !== '=') {
        // for chaining operations
        calculator.leftOperand = String(calculator.calculate());
        displayDiv.innerText = calculator.leftOperand;
        calculator.rightOperand = '';
        calculator.operator = op;
    }
    else if (calculator.result) {
        calculator.leftOperand = calculator.result;
        calculator.result = '';
        calculator.operator = op;
    }
    else {
        calculator.operator = op;
    }
}));