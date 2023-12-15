const resultField = document.querySelector(".result");
const operationsField = document.querySelector(".operation");
const buttonContainer = document.querySelector(".button-container");
const buttonRows = Array.from(buttonContainer.getElementsByClassName("button-row"));

let inputString = "";
let firstNumber = NaN;
let secondNumber = NaN;

buttonRows.forEach(row => {
    Array.from(row.getElementsByTagName("button")).forEach(button => {
        button.addEventListener("click", buttonHandler);            
    });
});

function buttonHandler(event) {
    let buttonContent = event.currentTarget.textContent;
    let buttonContentNumber = Number(buttonContent);

    if (!isNaN(buttonContentNumber)) {
        inputString += buttonContentNumber;
        operationsField.textContent = inputString;
    }
    else {
        if (inputString != "" && checkIfOperator(buttonContent)) {
            if (checkIfOperator(inputString.charAt(inputString.length - 2))) {
                inputString = inputString.replace(inputString.charAt(inputString.length - 2), buttonContent);
            }
            else {
                inputString += " " + buttonContent + " ";
            }           
            resultField.textContent = inputString;
        }
        else if (buttonContent == "Clear") {
            inputString = "";
            resultField.textContent = inputString;
            operationsField.textContent = "";
        }
        else if (inputString.length > 1 && buttonContent == "Undo") {
            inputArray = inputString.split(" ");
            if (inputArray.pop() == "") {
                inputArray.pop();
            }
            inputString = inputArray.join(" ");
            resultField.textContent = inputString;
        }
        else if (inputString != "" && buttonContent == "=") {
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
        }
    }
}

function addNumbers(number1, number2) {
    return Number(number1) + Number(number2);
}

function subtractNumbers(number1, number2) {
    return Number(number1) - Number(number2);
}

function multiplyNumbers(number1, number2) {
    return Number(number1) * Number(number2);
}

function divideNumbers(number1, number2) {
    if (number2 == 0) {
        operationsField.textContent = "Nah-ah-aah! Nah-ah-aah! We don't divide by zero!";
        return 0;
    }
    else {
        let result = Number(number1) / Number(number2);
        resultArray = String(result).split(".");
        return (resultArray[1] && resultArray[1].length >= 3) ? result.toFixed(3) : result;
    }
}

function checkIfOperator(contentString) {
    return contentString == "+" || contentString == "-" || contentString == "/" || contentString == "x";
}

function getFunctionalOperator(contentString) {
    return contentString == "x" ? "*" : contentString;
}