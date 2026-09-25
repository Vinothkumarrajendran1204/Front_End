import { useState } from 'react'

const App = () => {

    const [clickValue,setClickValue] = useState("")

    const [showData,setShowData] = useState("")

    const nameChange=(e)=>{

        setClickValue(e.target.value)
    }
    
    const dataClick=()=>{

        setShowData(clickValue)
        
    }

    

  return (
    <>

    <div>
        <input type="text" onChange={nameChange} value={clickValue} placeholder="enter the Name"/>
        <button onClick={dataClick}>click</button>
    </div>
    <div>
        <p>{showData}</p>
    </div>

    </>
  )
}

export default App