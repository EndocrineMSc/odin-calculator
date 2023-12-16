const resultField = document.querySelector(".result");
const operationsField = document.querySelector(".operation");
const buttonContainer = document.querySelector(".button-container");
const buttonRows = Array.from(buttonContainer.getElementsByClassName("button-row"));

let inputString = "";
let firstNumber = NaN;
let secondNumber = NaN;
let operatorPresent = false;
let justComputedResult = false;

buttonRows.forEach(row => {
    Array.from(row.getElementsByTagName("button")).forEach(button => {
        button.addEventListener("click", () => buttonHandler(button.textContent));            
    });
});

addEventListener("keydown", (event) => buttonHandler(event.key))

function buttonHandler(input) {
    if (input == "*") {
        input = "x";
    }
    let buttonContentNumber = Number(input);

    if (!isNaN(buttonContentNumber)) {
        if (inputString.length > 1 && checkIfOperator(inputString[inputString.length - 2])) {
            operatorPresent = true;
        }

        if (justComputedResult) {
            justComputedResult = false;
            inputString = "";
            resultField.textContent = "";
        }

        inputString += buttonContentNumber;
        operationsField.textContent = inputString;
    }
    else {
        //run result if a valid operator is already present
        if (operatorPresent && checkIfOperator(input)) {
            computeResult();
            addOperator(input);
        }
        else if (inputString != "" && checkIfOperator(input)) {
            addOperator(input);
        }
        else if (input == "Clear") {
            clearCalculator();
        }
        else if (inputString.length > 1 && (input == "Undo" || input == "Backspace")) {
            undoLastInput();
        }
        else if (inputString != "" && (input == "=" || input == "Enter")) {
            computeResult();
        }
        else if (input == ",") {
            addDecimalPoint();
        }
    }
}

function computeResult() {
    inputArray = inputString.split(" ");
    let result = 0;
    switch (inputArray[1]) {
        case "+":
            result = addNumbers(inputArray[0], inputArray[2]);
            break;
        case "-":
            result = subtractNumbers(inputArray[0], inputArray[2]);
            break;
        case "x":
            result = multiplyNumbers(inputArray[0], inputArray[2]);
            break;
        case "/":
            result = divideNumbers(inputArray[0], inputArray[2]);
            break;
    }
    resultField.textContent = result;
    inputString = String(result);
    operatorPresent = false;
    justComputedResult = true;
}

function addNumbers(number1, number2) {
    let result = Number(number1) + Number(number2);
    return getDigitLimitedNumber(result);
}

function subtractNumbers(number1, number2) {
    let result = Number(number1) - Number(number2);
    return getDigitLimitedNumber(result);
}

function multiplyNumbers(number1, number2) {
    let result = Number(number1) * Number(number2);
    return getDigitLimitedNumber(result);
}

function divideNumbers(number1, number2) {
    if (number2 == 0) {
        operationsField.textContent = "Nah-ah-aah! Nah-ah-aah! We don't divide by zero!";
        return 0;
    }
    else {
        let result = Number(number1) / Number(number2);
        return getDigitLimitedNumber(result);
    }
}

function getDigitLimitedNumber(number) {
    numberArray = String(number).split(".");
    return (numberArray[1] && numberArray[1].length >= 3) ? number.toFixed(3) : number;
}

function checkIfOperator(contentString) {
    return contentString == "+" || contentString == "-" || contentString == "/" || contentString == "x";
}

function getFunctionalOperator(contentString) {
    return contentString == "x" ? "*" : contentString;
}

function clearCalculator() {
    inputString = "";
    resultField.textContent = "";
    operationsField.textContent = "";
    justComputedResult = false;
    operatorPresent = false;
}

function undoLastInput() {
    inputArray = inputString.split(" ");
    if (inputArray.pop() == "") {
        inputArray.pop();
    }
    inputString = inputArray.join("");
    resultField.textContent = inputString;
}

function addDecimalPoint() {
    if (inputString == "") {
        inputString = "0,";
    }
    else {
        inputArray = inputString.split(" ");
        if ((inputArray.length > 2 && !inputArray[2].includes(",")) 
            || (inputArray.length == 1 && !inputArray[0].includes(","))) {
            inputString += ".";
            operationsField.textContent = inputString;
        }
    }
}

function addOperator(input) {
    if (checkIfOperator(inputString.charAt(inputString.length - 2))) {
        inputString = inputString.replace(inputString.charAt(inputString.length - 2), input);
    }
    else {
        inputString += " " + input + " ";
    } 
    justComputedResult = false;          
    operationsField.textContent = inputString;
}