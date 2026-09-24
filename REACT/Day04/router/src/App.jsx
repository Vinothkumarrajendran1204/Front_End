import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"

import About from "./pages/About"
import Navbar from "./component/Navbar"


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/About' element={<About/>}/>
      </Routes>
    </>
  )
}

export default App