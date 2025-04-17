/*-------------------------------- Constants --------------------------------*/

const buttons = document.querySelectorAll('.button');
const output = document.querySelector('.display');
const clear = document.querySelector('.button.clear');
const calculate = document.querySelector('.button.calculate');
const numbers = document.querySelectorAll('.button.number');
const operators = document.querySelectorAll('.button.operator');

/*-------------------------------- Variables --------------------------------*/

let operator = null;
let firstNum = null;
let secondNum = null;
let total = 0;


/*------------------------ Cached Element References ------------------------*/



/*----------------------------- Event Listeners -----------------------------*/

// buttons.forEach((button) => {
//     button.addEventListener('click', (event) => {
//         // This log is for testing purposes to verify we're getting the correct value
//         console.log('you have clicked: ', event.target.innerText);
//         // output.textContent = button.innerText;
//         // Future logic to capture the button's value would go here...
//     });
// });

clear.addEventListener('click', () => {
    console.log('Calculator has been reset.');
    firstNum = null;
    secondNum = null;
    operator = null;
    output.textContent = null;
    console.log("First number is: ", firstNum, "\nSecond number is: ", secondNum, "\nOperator is: ", operator);
});

calculate.addEventListener('click', () => {
    let firstNumParsed = parseInt(firstNum);
    let secondNumParsed = parseInt(secondNum);
    if (firstNum !== null && secondNum !== null) {
        switch (operator) {
            case "+":
                total = firstNumParsed + secondNumParsed;
                output.textContent = total;
                break;
            case "-":
                total = firstNumParsed - secondNumParsed;
                output.textContent = total;
                break;
            case "/":
                total = firstNumParsed / secondNumParsed;
                output.textContent = total;
                break;
            case "*":
                total = firstNumParsed * secondNumParsed;
                output.textContent = total;
                break;
            default:
                console.log('Error, check inputs.');
        }
        console.log("First number is: ", firstNumParsed, "and its a ", typeof (firstNumParsed));
        console.log("Second number is: ", secondNumParsed, "and its a ", typeof (secondNumParsed));
        console.log("Operator is: ", operator);
        console.log("The Total is: ", total);
    }
    else {
        console.log('Error, check inputs.');
    }
});

/*-------------------------------- Functions --------------------------------*/

operators.forEach((operand) => {
    operand.addEventListener('click', (event) => {
        if (firstNum === null) {
            console.log("Need to select input before operation");
            output.textContent = "Error";
        }
        else if (operator !== null) {
            console.log('Operator has already been selected.');
        } else {
            operator = event.target.innerText;
            console.log("Operator is: ", operator);
            console.log("Operator is a:", typeof (operator));
            return operator;
        };

    });
});

numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        if (operator === null) {
            if (firstNum === null) {
                firstNum = event.target.innerText;
                console.log('First number is: ', firstNum);
                output.textContent = firstNum;
                return firstNum;
            } else {
                firstNum = firstNum + event.target.innerText;
                console.log('First number is now: ', firstNum);
                output.textContent = firstNum;
                return firstNum;
            };
        };
        if (operator !== null) {
            if (firstNum === null) {
                console.log('error, need to select input before operation');
            }
            else {
                if (secondNum === null) {
                    secondNum = event.target.innerText;
                    console.log('Second number is: ', secondNum);
                    output.textContent = secondNum;
                    return secondNum;
                } else {
                    secondNum = secondNum + event.target.innerText;
                    console.log('Second number is now: ', secondNum);
                    output.textContent = secondNum;
                    return secondNum;
                };
            }
        };
    });
});