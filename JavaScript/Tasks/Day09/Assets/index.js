function calculateSum(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

console.log(calculateSum(10, 20));

function printEvenValues(limit) {

    for (let count = 1; count <= limit; count++) {

        if (count % 2 === 0) {
            console.log(count);
        }
    }
}

printEvenValues(10);



let findFactorial = (value) => {

    let result = 1;

    for (let position = 1; position <= value; position++) {
        result = result * position;
    }

    return result;
};

console.log(findFactorial(5));




var globalValue = "Global";

function scopeExample() {

    var functionValue = "Function";

    console.log(globalValue);
    console.log(functionValue);

    if (true) {

        let blockValue = "Block";
        const fixedValue = "Constant";

        console.log(globalValue);
        console.log(functionValue);
        console.log(blockValue);
        console.log(fixedValue);
    }
}

scopeExample();




console.log(firstData);

var firstData = 100;

console.log(secondData);

let secondData = 200;

console.log(thirdData);

const thirdData = 300;

showMessage();

function showMessage() {
    console.log("Function declaration is hoisted");
}