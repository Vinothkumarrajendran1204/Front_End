let btn = document.getElementById("btn")

btn.addEventListener("click",(e)=>{
    e.preventDefault()
    let name=document.getElementById("name").value
    let age=document.getElementById("age").value
    

    const getData = JSON.parse(localStorage.getItem("datas")) || []

    let object ={name,age}

    getData.push(object)

    localStorage.setItem("datas",JSON.stringify(getData))

    window.location.href="./dash.html";
    
})