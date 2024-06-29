import { useState } from 'react';
import axios from 'axios';

const FilterTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [filter, setFilter] = useState({ minAge: '', maxAge: '', minClasses: '', maxClasses: '' });

  const filterByAge = async () => {
    const response = await axios.get('http://localhost:1000/teachers/filter/age', {
      params: {
        minAge: filter.minAge,
        maxAge: filter.maxAge
      }
    });
    setTeachers(response.data);
  };

  const filterByClasses = async () => {
    const response = await axios.get('http://localhost:1000/teachers/filter/classes', {
      params: {
        minClasses: filter.minClasses,
        maxClasses: filter.maxClasses
      }
    });
    setTeachers(response.data);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Filter Teachers</h2>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Filter by Age</h3>
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Min Age"
          value={filter.minAge}
          onChange={(e) => setFilter({ ...filter, minAge: e.target.value })}
        />
        <input
          type="number"
          className="border p-2"
          placeholder="Max Age"
          value={filter.maxAge}
          onChange={(e) => setFilter({ ...filter, maxAge: e.target.value })}
        />
        <button onClick={filterByAge} className="bg-blue-500 text-white p-2 ml-2">Filter</button>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2">Filter by Number of Classes</h3>
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Min Classes"
          value={filter.minClasses}
          onChange={(e) => setFilter({ ...filter, minClasses: e.target.value })}
        />
        <input
          type="number"
          className="border p-2"
          placeholder="Max Classes"
          value={filter.maxClasses}
          onChange={(e) => setFilter({ ...filter, maxClasses: e.target.value })}
        />
        <button onClick={filterByClasses} className="bg-blue-500 text-white p-2 ml-2">Filter</button>
      </div>

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

export default FilterTeachers;
