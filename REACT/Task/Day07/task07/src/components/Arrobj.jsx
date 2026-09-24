

const Arrobj = () => {
    const arrObj = [
        {id:1, name:"Vinoth", age:22, course:"FS"},
        {id:2, name:"Mohan", age:21, course:"FS"},
        {id:3, name:"Tharun", age:23, course:"FS"},
        {id:4, name:"Dhanush", age:24, course:"FS"},
        {id:5, name:"Anbu", age:25, course:"FS"}
    ]
  return (
    <div>
        <h2>Students Details</h2>
        {arrObj.map((e)=>(
            <div key={e.id}>
                <h2>{e.id}</h2>
                <p>Student Name:{e.name}</p>
                <p>Student Age:{e.age}</p>
                <p>Student Course:{e.course}</p>
            </div>
        ))}
    </div>
  )
}

export default Arrobj