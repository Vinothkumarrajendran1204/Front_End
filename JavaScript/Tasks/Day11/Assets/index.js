function processNumber(numberValue, callbackFunction) {
    let resultValue = numberValue * 2;

    callbackFunction(resultValue);
}

function displayResult(finalValue) {
    console.log(finalValue);
}

processNumber(10, displayResult);




function createCounter() {

    let countValue = 0;

    return function () {
        countValue++;
        console.log(countValue);
    };
}

let counterFunction = createCounter();

counterFunction();
counterFunction();
counterFunction();




let valueArray = [10, 20, 30, 40, 50];

valueArray.push(60);
valueArray.push(70);

valueArray.pop();

console.log(valueArray);




let nameArray = ["Arun", "Kumar", "Ravi"];

nameArray.unshift("Vinoth");

nameArray.shift();

console.log(nameArray);



const originalNumbers = [10, 20, 30];

let copiedNumbers = [];

for (let i = 0; i < originalNumbers.length; i++) {
    copiedNumbers[i] = originalNumbers[i];
}

copiedNumbers[copiedNumbers.length] = 40;

console.log(copiedNumbers);




const fruitList = ["Apple", "Mango", "Orange"];
const vegetableList = ["Carrot", "Potato"];

fruitList.push("Banana");

fruitList.pop();

fruitList.unshift("Grapes");

fruitList.shift();

console.log("Length:", fruitList.length);

let finalList = fruitList.concat(vegetableList);

console.log(finalList);