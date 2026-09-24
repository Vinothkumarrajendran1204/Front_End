const Student = () => {

  let studentName = "Vinoth";
  let age = 22;
  let course = "FS";
  let isActive = true;
  let fees = 40000;

  return (
    <div>
      <h2>Student Details</h2>

      <p>Student Name: {studentName}</p>
      <p>Age: {age}</p>
      <p>Course: {course}</p>
      <p>Status: {isActive ? "Active" : "Inactive"}</p>
      <p>Fees: {fees}</p>
    </div>
  );
};

export default Student;