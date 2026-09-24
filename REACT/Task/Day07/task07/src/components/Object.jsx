

const Object = () => {

    const obj = {name:"Vinoth", age:22, course:"FS", city:"Trichy"}
  return (
    <div>
        <h2>Student Detail</h2>

        <p>Student Name:{obj.name}</p>
        <p>Student Age:{obj.age}</p>
        <p>Student Course:{obj.course}</p>
        <p>Student City:{obj.city}</p>
    </div>
  )
}

export default Object