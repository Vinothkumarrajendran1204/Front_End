let para = document.getElementById("para");
let btn = document.getElementById("btn");

btn.addEventListener("click",()=> {


    para.classList.toggle("show");

    if (para.classList.contains("show")) {
        btn.innerText = "Hide";
    } else {
        btn.innerText = "Show";
    }

    });