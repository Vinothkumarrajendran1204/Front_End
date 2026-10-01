import { useState } from 'react'

const App = () => {

  const [clickValue,setClickValue] = useState({})
  return (
    <>
    <div>
      <input type="text" onChange={nameChange} value={clickValue} placeholder="enter the Name"/>
      <input type="email" onChange={nameChange} value={clickValue} placeholder="enter the email"/>
      <input type="number" onChange={nameChange} value={clickValue} placeholder="enter the Age"/>
    </div>
    </>
  )
}

export default App