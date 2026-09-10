let box = document.getElementsByClassName("box")[0]
let btn = document.getElementsByClassName("btn")[0]

btn.addEventListener("click",()=> {
    box.classList.add("active");
});