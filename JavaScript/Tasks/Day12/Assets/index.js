let numberList1 = [10, 20, 30, 40, 50];

numberList1.push(60);
numberList1.push(70);
numberList1.push(80);

console.log(numberList1);



let fruitList1 = ["Apple", "Mango", "Orange", "Banana", "Grapes", "Pineapple"];

let removedFruit1 = fruitList1.pop();
let removedFruit2 = fruitList1.pop();

console.log("Removed:", removedFruit1);
console.log("Removed:", removedFruit2);
console.log("Final Array:", fruitList1);





let cityList1 = ["Chennai", "Trichy", "Madurai", "Salem", "Coimbatore"];

let removedCity1 = cityList1.shift();

cityList1.unshift("Bangalore");

console.log("Removed City:", removedCity1);
console.log(cityList1);




let studentNames1 = ["Arun", "Bala", "Kumar", "Ravi", "Ajay"];

studentNames1.forEach((studentName, position) => {
    console.log((position + 1) + ". " + studentName);
});




let numberList2 = [10, 20, 30, 40, 50];

let doubledNumbers1 = numberList2.map((numberValue) => {
    return numberValue * 2;
});

console.log(doubledNumbers1);

