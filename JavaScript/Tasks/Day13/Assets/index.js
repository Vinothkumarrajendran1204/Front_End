let headingElement = document.getElementById("mainHeading");

headingElement.textContent = "Welcome to DOM";


let paragraphElements = document.querySelectorAll(".description");

paragraphElements.forEach((paragraph, index) => {
    paragraph.textContent = "This is paragraph " + (index + 1);
});


