let fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}



let student = {
    name: "Vinoth",
    age: 22,
    course: "Java Full Stack",
    mark: 85
};

console.log(student.name);
console.log(student.age);
console.log(student.course);
console.log(student.mark);



let students1 = [
    {
        name: "Vinoth",
        mark: 85
    },
    {
        name: "Arun",
        mark: 90
    },
    {
        name: "Kumar",
        mark: 78
    }
];

for (let i = 0; i < students1.length; i++) {
    console.log(students1[i].name, students1[i].mark);
}



let students2 = [
    {
        name: "Vinoth",
        mark: 85
    },
    {
        name: "Arun",
        mark: 90
    },
    {
        name: "Kumar",
        mark: 78
    }
];

let target = "Arun";

for (let i = 0; i < students2.length; i++) {

    if (students2[i].name === target) {
        console.log("Name:", students2[i].name);
        console.log("Mark:", students2[i].mark);
        break;
    }
}



let employees = [
    {
        name: "Vinoth",
        salary: 35000
    },
    {
        name: "Arun",
        salary: 45000
    },
    {
        name: "Kumar",
        salary: 50000
    },
    {
        name: "Ravi",
        salary: 38000
    }
];

for (let i = 0; i < employees.length; i++) {

    if (employees[i].salary > 40000) {
        console.log(employees[i].name, employees[i].salary);
    }
}
```
