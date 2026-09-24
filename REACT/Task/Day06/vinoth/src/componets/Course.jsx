

const Course = () => {
    
  const courses = ["Java", "Python", "React", "SQL", "HTML"];

  return (
    <div>
      <h2>Task 01</h2>

      {courses.map((e, i) => (
        <p key={i}>{e}</p>
      ))}
    </div>
  );
};

export default Course;