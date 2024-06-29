import { useState } from 'react';
import axios from 'axios';

const SearchTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchName, setSearchName] = useState('');

  const searchTeacher = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:1000/teachers/search?name=${searchName}`);
    setTeachers(response.data);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Search Teacher</h2>
      <form onSubmit={searchTeacher} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">Search</button>
      </form>

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

export default SearchTeacher;
