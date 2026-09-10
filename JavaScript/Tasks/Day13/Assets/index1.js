let titleElement = document.getElementById("titleText");
let buttonElement = document.getElementById("changeButton");

buttonElement.addEventListener("click", function () {

    titleElement.textContent = "Button Clicked";

    titleElement.style.color = "blue";

    titleElement.classList.add("headingStyle");
});




