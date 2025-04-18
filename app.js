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
let firstNumParsed = null;
let secondNumParsed = null;
let total = 0;

// i ended up coming back to figure out how to keep calculating after hitting equals
// ran into a few issues but got it to work with adding in the parsed numbers to hold the values
// while it reset the first and second nums after each equals in order to start
// a new calc if numbers were pressed, or if a operator was pressed to continue from
// the previous total

// i ended up leaving the numbers as a string until calculations because it was the
// easiest, and only way i figured out cause i didnt search, how to make the number
// multiple digits (ie. pressing 2 and 5 and 7 will turn out as 257)

/*------------------------ Cached Element References ------------------------*/

// not sure what this area was for...

/*----------------------------- Event Listeners -----------------------------*/

// buttons.forEach((button) => {
//     button.addEventListener('click', (event) => {
//         // This log is for testing purposes to verify we're getting the correct value
//         console.log('you have clicked: ', event.target.innerText);
//         // output.textContent = button.innerText;
//         // Future logic to capture the button's value would go here...
//     });
// });

clear.addEventListener('click', () => { // sets everything back to null
    firstNum = null;
    secondNum = null;
    firstNumParsed = null;
    secondNumParsed = null;
    operator = null;
    output.textContent = null;
    console.log('Calculator has been reset.');
    // console.log("First number is: ", firstNum, "\nSecond number is: ", secondNum, "\nOperator is: ", operator);
});

calculate.addEventListener('click', () => { // calculates after hitting equals, then sets values to null while parsed values hold
    firstNumParsed = parseInt(firstNum);    // the parsed values end up carrying the data to continue operations if needed
    secondNumParsed = parseInt(secondNum);
    if (firstNum !== null && secondNum !== null) {
        switch (operator) {
            case "+":
                total = firstNumParsed + secondNumParsed;
                break;
            case "-":
                total = firstNumParsed - secondNumParsed;
                break;
            case "/":
                total = firstNumParsed / secondNumParsed;
                break;
            case "*":
                total = firstNumParsed * secondNumParsed;
                break;
            default:
                console.log('Error, check inputs.');
        }
        output.textContent = total;
        firstNum = null; // set to null to continue calculating if operator pressed, or to soft reset for new calc
        secondNum = null;
        operator = null;
        // console.log("First number is: ", firstNumParsed, "and its a ", typeof (firstNumParsed));
        // console.log("Second number is: ", secondNumParsed, "and its a ", typeof (secondNumParsed));
        // console.log("Operator is: ", operator);
        console.log("The Total is: ", total);
    }
    else {
        console.log('Error, check inputs.');
    }
});

/*-------------------------------- Functions --------------------------------*/

operators.forEach((operand) => {
    operand.addEventListener('click', (event) => {
        if (secondNum === null) { // uses second number condition before setting operator
            if (firstNum === null) {
                console.log("Error, Need to select input before operation.");
                output.textContent = "Error";
            } else {
                operator = event.target.innerText;
                console.log("Operator is: ", operator);
                output.textContent = firstNum + " " + operator; // so the operator shows on display also
                // console.log("Operator is a:", typeof (operator));
                return operator;
            }
        } else { // if second number is input already, preforms a calculation (second number can only be input after an operator)
            firstNumParsed = parseInt(firstNum);
            secondNumParsed = parseInt(secondNum);
            switch (operator) {
                case "+":
                    total = firstNumParsed + secondNumParsed;
                    break;
                case "-":
                    total = firstNumParsed - secondNumParsed;
                    break;
                case "/":
                    total = firstNumParsed / secondNumParsed;
                    break;
                case "*":
                    total = firstNumParsed * secondNumParsed;
                    break;
                default:
                    console.log('Error, check inputs.');
            };
        };
        operator = event.target.innerText;
        firstNum = total; // sets first num to total to allow continuing operations
        secondNum = null;
        output.textContent = total + " " + operator;
        // console.log(operator, firstNum, secondNum);
    });
});


numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        if (operator === null) { // checks for operator condition before setting first number
            if (firstNum === null) { // sets initial first number
                firstNum = event.target.innerText;
                console.log('First number is: ', firstNum);
            } else { // since numbers are a string we can add numbers together to build them out (ie. 1+2 = 12)
                firstNum = firstNum + event.target.innerText;
                console.log('First number is now: ', firstNum);
            };
            output.textContent = firstNum;
            return firstNum;
        } else {
            if (secondNum === null) {
                secondNum = event.target.innerText;
                console.log('Second number is: ', secondNum);
            } else {
                secondNum = secondNum + event.target.innerText;
                console.log('Second number is now: ', secondNum);
            };
            output.textContent = firstNum + " " + operator + " " + secondNum; // added to show all numbers and operator in display
            return secondNum;
        };
    });
});