/*-------------------------------- Constants --------------------------------*/

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display'); 
const reset = document.querySelector('.button.reset');
const calculate = document.querySelector('.button.calculate');
const numbers = document.querySelectorAll('.button.number');
const operators = document.querySelectorAll('.button.operator');
const invert = document.querySelector('.button.invert');
const decimal = document.querySelector('.button.decimal'); 

/*-------------------------------- Variables --------------------------------*/

let operator = null;  
let firstOperand = null;  
let secondOperand = null;
let firstOperandParsed = null;
let secondOperandParsed = null;
let total = 0;


/*------------------------------- functions ---------------------------------*/

const performCalc = function () {
    console.log("performing calculations")
    firstOperandParsed = parseFloat(firstOperand);
    secondOperandParsed = parseFloat(secondOperand);
    if (firstOperand !== null && secondOperand !== null) {
        switch (operator) {
            case "+":
                total = firstOperandParsed + secondOperandParsed;
                break;
            case "-":
                total = firstOperandParsed - secondOperandParsed;
                break;
            case "/":
                total = firstOperandParsed / secondOperandParsed;
                break;
            case "*":
                total = firstOperandParsed * secondOperandParsed;
                break;
            default:
                console.log('Error, check inputs.');
        };
        if (total == Infinity || total === -Infinity || isNaN(total)) {
            display.textContent = "Can't Divide By Zero";
            firstOperand = null;
            secondOperand = null;
            operator = null;
            console.log("Cannot Divide By Zero! This makes the total: ", total);
            total = 0;
        } else {
            display.textContent = total;
            console.log("The Total is: ", total);
        };
        firstOperand = null;
        secondOperand = null;
        operator = null;
    };
};

const clear = function () {
    firstOperand = null;
    secondOperand = null;
    firstOperandParsed = null;
    secondOperandParsed = null;
    operator = null;
    total = 0;
    display.textContent = total;
    console.log('Calculator has been reset.');
};

const inversion = function () {
    if (secondOperand === null) {
        if (operator === null) {
            if (firstOperand === 0) {
                display.textContent = firstOperand;
            } else {
                firstOperand = -firstOperand;
                display.textContent = firstOperand;
            }
        } else {
            firstOperand = -firstOperand;
            display.textContent = firstOperand + " " + operator;
        }
    } else {
        if (secondOperand === 0) {
            display.textContent = secondOperand;
        } else {
            secondOperand = -secondOperand;
            display.textContent = firstOperand + " " + operator + " " + secondOperand;
        };
    };
};

const addDecimal = function () {
    if (operator === null) {
        if (firstOperand === null || firstOperand == 0) {
            console.log('setting decimal');
            firstOperand = 0 + event.target.innerText;
        } else {
            if (String(firstOperand).includes(".")) {
                console.log('first number already has decimal');
            } else {
                firstOperand = firstOperand + event.target.innerText;
            };
        };
        display.textContent = firstOperand;
    } else {
        if (secondOperand === null) {
            secondOperand = 0 + event.target.innerText;
        } else {
            if (String(secondOperand).includes(".")) {
                console.log('second number already has decimal');
            } else {
                secondOperand = secondOperand + event.target.innerText;
            };
        };
        display.textContent = firstOperand + " " + operator + " " + secondOperand;
    };
};

operators.forEach((operation) => {
    operation.addEventListener('click', (event) => {
        if (secondOperand === null) {
            if (firstOperand === null) {
                firstOperand = total;
                operator = event.target.innerText;
                display.textContent = firstOperand + " " + operator;
            } else {
                if (String(firstOperand).includes(".")) {
                    firstOperand = Number.parseFloat(firstOperand)
                    operator = event.target.innerText;
                    display.textContent = firstOperand + " " + operator;
                } else {
                    operator = event.target.innerText;
                    display.textContent = firstOperand + " " + operator;
                };
            };
        } else {
            performCalc()
            firstOperand = total;
            secondOperand = null;
            operator = event.target.innerText;
            // display.textContent = total + " " + operator;
            // console.log("The Total is: ", total);
            // total = 0;
        };
    });
});

numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        if (operator === null) {
            if (firstOperand === null) {
                firstOperand = event.target.innerText;
            }
            else if (firstOperand != null && firstOperand == 0 && !String(firstOperand).includes(".")) {
                console.log('first operand already is 0');
                firstOperand = event.target.innerText;
            } else {
                firstOperand = firstOperand + event.target.innerText;
            };
            display.textContent = firstOperand;
        } else {
            if (secondOperand === null) {
                secondOperand = event.target.innerText;
            }
            else if (secondOperand !== null && secondOperand === 0 && !String(secondOperand).includes(".")) {
                secondOperand = event.target.innerText;
            } else {
                secondOperand = secondOperand + event.target.innerText;
            };
            display.textContent = firstOperand + " " + operator + " " + secondOperand;
        };
    });
});

/*----------------------------- Event Listeners -----------------------------*/

reset.addEventListener('click', () => { clear() });

calculate.addEventListener('click', () => { performCalc() });

invert.addEventListener('click', () => { inversion() });

decimal.addEventListener('click', () => { addDecimal() });