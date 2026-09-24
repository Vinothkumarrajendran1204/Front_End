

const Employee = (props) => {
    
  return (
    <div>
      <h2>Task 04</h2>

      <p>Name: {props.employee.name}</p>
      <p>Role: {props.employee.role}</p>
      <p>Salary: {props.employee.salary}</p>
      <p>City: {props.employee.city}</p>
    </div>
  );
};

export default Employee;