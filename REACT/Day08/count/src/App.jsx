// import { useState } from 'react'

// const App = () => {

//   let [count,setCount]=useState(0)

//   let countHandle=()=>{

    
//     count++

//     setCount(count)

//   }

//   return (
//     <div>
//       <h2>{count}</h2>
//       <button onClick={countHandle}>Click</button>

//     </div>
//   )
// }

// export default App



import {useState} from 'react'

const App = () => {

  let [isActive,setIsActive]=useState(true)

  let fun = ()=>{

    setIsActive(!isActive)
  }

  return (
    <div>
      <p>{isActive?"Vinoth":"Mohan"}</p>
      <button onClick={fun}>Click</button>
    </div>
  )
}

export default App