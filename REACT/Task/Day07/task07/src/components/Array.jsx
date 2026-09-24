

const Array = () => {

    const arr = ["HTML", "CSS", "Python", "Java", "JavaScript"]

  return (
    <div>
        {arr.map((e,i)=>(
            <p key={i}>{e}</p>
        ))}
    </div>
  )
}

export default Array