import { useState } from 'react'

const App = () => {

  const [userName,setUserName] = useState("")

  const [userAge,setUserAge] = useState("")

  const [showData,setShowData] = useState([])

  const nameChange =(e)=>{

    setUserName(e.target.value)

  }

  const ageChange =(e)=>{
    
    setUserAge(e.target.value)

  }


  const handleClick = ()=>{

    const obj = {id:Date.now(), Name:userName, Age:userAge}

    const arr = [...showData]

    arr.push(obj)

    setShowData(arr)
  }

  return (
    <>
    <div>
      <input type="text" onChange={nameChange} value={userName} placeholder="enter the Name"/>
      <input type="number" onChange={ageChange} value={userAge} placeholder="enter the Age"/>
      <button onClick={handleClick}>Click</button>
    </div>

    <div>
      <table border="2" cellPadding="2" cellSpacing="2">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {showData.map((e)=>(
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.Name}</td>
              <td>{e.Age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default App