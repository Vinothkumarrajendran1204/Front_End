let numbers1 = [10, 20, 30, 40, 50];

for (let i = 0; i < numbers1.length; i++) {
    console.log(numbers1[i]);
}


let students1 = ["Vinoth", "Arun", "Kumar", "Ravi", "Ajay"];

for (let i = 0; i < students1.length; i++) {
    console.log(students1[i]);
}


let numbers2 = [10, 15, 22, 31, 40, 55, 68];

for (let i = 0; i < numbers2.length; i++) {

    if (numbers2[i] % 2 === 0) {
        console.log(numbers2[i]);
    }
}


let students2 = [
    {
        name: "Vinoth",
        mark: 85
    },
    {
        name: "Arun",
        mark: 75
    },
    {
        name: "Kumar",
        mark: 90
    },
    {
        name: "Ravi",
        mark: 65
    }
];

for (let i = 0; i < students2.length; i++) {

    if (students2[i].mark > 80) {
        console.log(students2[i].name);
    }
}


let add = (a, b) => {
    return a + b;
};

console.log(add(10, 20));


let studentDetails = (name, mark) => {
    return "Student Name: " + name + ", Mark: " + mark;
};

console.log(studentDetails("Vinoth", 85));
```
