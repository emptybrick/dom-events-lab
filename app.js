/*-------------------------------- Constants --------------------------------*/

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');  // set the variable for display div so I can add input to it
const reset = document.querySelector('.button.reset'); // set the variable for C button to be able to reset calculator
const calculate = document.querySelector('.button.calculate'); // variable for equals
const numbers = document.querySelectorAll('.button.number');
const operators = document.querySelectorAll('.button.operator'); // variable for all operators
const invert = document.querySelector('.button.invert'); // variable to change the sign (plus/minus or negative/positive)
const decimal = document.querySelector('.button.decimal'); // variable for the decimal

/*-------------------------------- Variables --------------------------------*/

let operator = null;  // holds operator as string and is used in a switch statement to decide what operation to be performed
let firstOperand = null;  // will hold first string input, which can add together to build a longer string to parse
let secondOperand = null;  // will hold second string input
let firstOperandParsed = null;  // will hold numbers converted from strings
let secondOperandParsed = null;  // will hold numbers converted from strings
let total = 0;  // total is set to 0 as a baseline number to start calculations

// i ended up coming back to figure out how to keep calculating after hitting equals
// ran into a few issues but got it to work with adding in the parsed numbers to hold the values
// while it reset the first and second nums after each equals in order to start
// a new calc if numbers were pressed, or if a operator was pressed to continue from
// the previous total

// i ended up leaving the numbers as a string until calculations because it was the
// easiest, and only way i figured out cause i didnt search, how to make the number
// multiple digits (ie. pressing 2 and 5 and 7 will turn out as 257)

// encountered an issue if selecting operator without first number it sets first number as 0
// i started to adjust things when i realized that this was actually ideal so im trying to get
// it to be a part of the code now

// i am now running into the issue where 0 can be selected first, and end up with the string ie. 01230
// i want it to default if 0 is select first to change to the next number selected and keep adding ie. 01230 --> 1230
// the issue is in the numbers function, im honing in.
// i figured out that i needed to check the condition if firstOperand or secondOperand == false (loose equality)
// took me a minute and had to go back to figure out that 2 == meant loose, because the values in those variables
// are strings so i needed to know that it was the string "0" vs the number 0

// the latest (hopefully last) edgecase i have found is division by 0, and I think i need to adjust the calculator
// in both the calculate and operator functions for when divided by 0 will return undefined or cannot divide by 0
// right now it will return 0/0 = NaN, or 1/0 = infinity.. which are both true cases.  but you can continue to calculate
// i think it needs to perform a soft reset and when a number button is pressed start a new calculation

// after figuring out the last edge case i went and updated my variable names to make more sense

// the only thing i can think of adding is the ability for decimals.
// i ended up adding in the decimal button, and put it as a number and everything worked smoothely..
// although i got annoyed by the button layout, so i added another button to invert the sign of the number
// it took a little bit of figuring out
// ended up with the case u can keep adding decimals.. going to seperate decimal from numbers and set its own function

// next issue, which is a minor graphical problem.. is when u press decimal and then an operator it leaves 
// the number with just a decimal then the operator on the display ie. 2. + ## or 0. - ##.. trying to find solution
// i think it has to do with the operator function 

/*------------------------ Cached Element References ------------------------*/

// not sure what this area was for...

/*----------------------------- Event Listeners -----------------------------*/

// buttons.forEach((button) => {
//     button.addEventListener('click', (event) => {
//         // This log is for testing purposes to verify we're getting the correct value
//         console.log('you have clicked: ', event.target.innerText);
//         // display.textContent = button.innerText;
//         // Future logic to capture the button's value would go here...
//     });
// });

// sets everything back to null or 0 this is a hard reset
// after reset display 0 or total (which at this point is 0)
reset.addEventListener('click', () => {
    firstOperand = null;
    secondOperand = null;
    firstOperandParsed = null;
    secondOperandParsed = null;
    operator = null;
    total = 0;
    display.textContent = total;
    console.log('Calculator has been reset.');
    // console.log("First number is: ", firstOperand, "\nSecond number is: ", secondOperand, "\nOperator is: ", operator);
    // console.log("First number Parsed is: ", firstOperandParsed, "\nSecond number Parsed is: ", secondOperandParsed);
});

// sends values to parsed variables to hold while total pulls from them
// uses a switch statement using the string in operator value to decide operation
// throws error when operator is not selected before calculating, and does nothing (waits for input)
// total is based on parsed variables so first and second number variables can be reset to continue calculating
// also performs a soft reset to allow continuing calculations, or if a number is selected right after,
// it will start a new calculation
calculate.addEventListener('click', () => {
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
        // checking if result is NaN or Infinity (dividing by zero)
        // if so it sets total to 0
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
        // soft reset to continue calculations
        firstOperand = null;
        secondOperand = null;
        operator = null;
    }
    // checking if there are inputs for first number and operator and if its just
    // a case second number wasnt set, to keep display and do nothing
    else if (firstOperand !== null && operator !== null) {
        console.log('Error during calculating, check inputs.');
        display.textContent = firstOperand + " " + operator;
    }
    else if (firstOperand !== null && operator === null) {
        console.log('Error during calculating, check inputs.');
        display.textContent = firstOperand;
        // if calculate was selected before any inputs done, keeps value on display and do nothing    
    } else {
        console.log('Error during calculating, check inputs.');
        display.textContent = 0;
    };
});

// adding a invert sign function 
// got the idea of using -firstOperand from searching online.. the rest i did myself
// its first checking if the second operand is null (no input), if so it changes the sign of the first operand
// it then checks if operand is 0 and if so do nothing, if not it inverts the sign by making value = -value
// i had to set a display check so it would display the operator if selected or not
invert.addEventListener('click', () => {
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
    }
});

// decimal event listener
// checks if operator is null to see if its setting first or second operand value
// checks if operand is null or 0 to set a 0.0 display and value
// if not it assumes it starts with any other number and adds more numbers
// this was to allow it to start from zero, and display 0. if decimal is clicked first, or zero then decimal
// lookes to see if theres a decimal before adding more numbers, if there is it will just display and do nothing
decimal.addEventListener('click', (event) => {
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
});

/*-------------------------------- Functions --------------------------------*/
// after click operator theres a few conditions its looking for to decide what to do.
// uses second number condition before setting operator.
// if second number hasnt been set this looks for first number value, if null it sets to total.
// setting to total will either set as previous calculation value,
// or 0 to be able to start from 0 if operator is selected first or continue from previous calculation.
// if second number is input already, preforms a calculation (second number can only be input after an operator)
// also will perform a soft reset on variables to allow continuing calculations
operators.forEach((operation) => {
    operation.addEventListener('click', (event) => {
        if (secondOperand === null) {
            if (firstOperand === null) {
                firstOperand = total;
                operator = event.target.innerText;
                display.textContent = firstOperand + " " + operator; 
            } else {
                if (String(firstOperand).includes(".")) { // fix graphic issue with showing ie. (0. + ## or 2. - ##)
                    firstOperand = Number.parseFloat(firstOperand)
                    operator = event.target.innerText;
                    display.textContent = firstOperand + " " + operator;
                } else {
                operator = event.target.innerText;
                display.textContent = firstOperand + " " + operator;            
            };
        };
        } else {
            firstOperandParsed = parseFloat(firstOperand);
            secondOperandParsed = parseFloat(secondOperand);
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
            // checking if result is NaN or Infinity (dividing by zero) if so reset calculator            
            if (total === Infinity || total === -Infinity || isNaN(total)) { // had to learn about isNaN after looking for solution
                display.textContent = "Can't Divide By Zero";
                firstOperand = null;
                secondOperand = null;
                operator = null;
                console.log("Cannot Divide By Zero! This makes the total: ", total);
                total = 0;
            } else {
                firstOperand = total; // sets first num to total to allow continuing operations, performs a soft reset
                secondOperand = null;
                operator = event.target.innerText;
                display.textContent = total + " " + operator;
                console.log("The Total is: ", total);
                total = 0; // sets total to 0 after display message
            };
        };
    });
});

// i have the function checking first if the variable is null, or if the variable is 0, so u cant start with 0 ie. 0123
// first it checks for operator condition before setting first number, will set first number if no operator is selected
// then it sets initial first number, if operator is selected before any number, the operator function takes care of it
// since numbers are a string we can add numbers together to build them out (ie. 1+2 = 12)
// if operator is set it will go to second number and assign values
// kept throwing an error in the case of 0.0 and trying to invert, had to look up and found that !String method for a fix
// found out .includes only is strings, had to add that else if so multiple zeros cant be input when starting from null
numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        if (operator === null) {
            if (firstOperand == null) {
                firstOperand = event.target.innerText;
            }
            else if (firstOperand != null && firstOperand == 0 && !String(firstOperand).includes(".")) { // prevent 0000
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
            else if (secondOperand != null && secondOperand == 0 && !String(secondOperand).includes(".")) {
                secondOperand = event.target.innerText;
            } else {
                secondOperand = secondOperand + event.target.innerText;
            };
            display.textContent = firstOperand + " " + operator + " " + secondOperand;
        };
    });

}); 