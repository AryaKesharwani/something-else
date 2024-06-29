import { useState, useEffect } from 'react';
import axios from 'axios';

const ShowTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    const response = await axios.get('http://localhost:1000/teachers');
    setTeachers(response.data);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">All Teachers</h2>
      <div>
        {teachers.map((teacher) => (
          <div key={teacher.id} className="border p-2 mb-2">
            <p>ID: {teacher.id}</p>
            <p>Name: {teacher.fullName}</p>
            <p>Age: {teacher.age}</p>
            <p>Date of Birth: {teacher.dateOfBirth}</p>
            <p>Number of Classes: {teacher.numClasses}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowTeachers;
