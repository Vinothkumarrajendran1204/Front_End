const buttonOne = document.getElementById("buttonOne")

const reaction = document.getElementById("reaction")

let ison = false;



buttonOne.addEventListener("click",()=>{


    ison = !ison

    if (ison) {
        reaction.textContent = ""
    }else{
        reaction.textContent = "This is a First Click"
    }
    

})




