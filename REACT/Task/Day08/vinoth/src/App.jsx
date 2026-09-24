import { useState } from 'react'

const App = () => {
  let [counter,setCounter] = useState(0)

  const isIncrement=()=>{
    counter++
    setCounter(counter)
  }

  const isDecrement=()=>{
    counter--
    setCounter(counter)
  }

  const isReset=()=>{
    
    setCounter(0)
  }

  return (
    <div>
      <h2>{counter}</h2>
      <button onClick={isIncrement}>Increment</button>
      <button onClick={isDecrement}>Decrement</button>
      <button onClick={isReset}>Reset</button>
    </div>
  )
}

export default App