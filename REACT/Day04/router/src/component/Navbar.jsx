import { Link } from "react-router-dom"
import photo from "../assets/react.svg"

const Navbar = () => {
  return (
    <>
    <div>
        <div>
          <img src={photo} alt="logo" width={100} height={100}/>
        </div>
        <div>
            <Link to="/">Home</Link>
            <Link to="/About">About</Link>
        </div>
    </div>
    </>
  )
}

export default Navbar