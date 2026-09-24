import Course from "./componets/Course";
import Student from "./componets/Student";
import Carts from "./componets/Carts";
import Employee from "./componets/Employee";

const App = () => {
    
    const employee = {

        name: "Vinothkumar",
        role: "Full Stack Developer",
        salary: 80000,
        city: "Chennai"
    };
  return (
    <div>
        <Course/>
        <Student/>
        <Carts/>
        <Employee employee={employee} />
    </div>  
  )
}

export default App