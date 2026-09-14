const getData = JSON.parse(localStorage.getItem("datas")) || [];

let output = document.getElementById("output");

getData.forEach((e) => {

    output.innerHTML += `
      
            <h3>Name: ${e.name}</h3>
            <p>Age: ${e.age}</p>
        <hr>
    `;
});