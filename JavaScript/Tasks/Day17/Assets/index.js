let students = [];

const addStudent = () => {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let city = document.getElementById("city").value;

    let student = {
        name: name,
        age: age,
        city: city
    };

    students.push(student);

    const showing = document.getElementById("studentlist");

    showing.innerHTML = "";

    let table = document.createElement("table");

    table.border = "1";

    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
        </tr>
    `;

    students.forEach((student) => {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.city}</td>
        `;

        table.appendChild(row);
    });

    showing.appendChild(table);
};

document.getElementById("btn").addEventListener("click", addStudent);