
 let btn = document.getElementById("btn")

// let array= []

 btn.addEventListener("click",(e)=>{

     e.preventDefault()
     let name = document.getElementById("name").value
     let age = document.getElementById("age").value

 const getLocal = JSON.parse(localStorage.getItem("Details")) || []

     let  object = {name,age}

     getLocal.push(object)

     localStorage.setItem("Details", JSON.stringify(getLocal));



 })

