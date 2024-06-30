import { useState, useEffect } from 'react';
import axios from 'axios';

import getURI from '../../config/getURI';
let uri = getURI();

const ShowTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${uri}/teachers`);
      setTeachers(response.data);
    } catch (error) {
      console.error('Failed to load teachers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">All Teachers</h2>
      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading teachers...</p>
        </div>
      ) : teachers.length === 0 ? (
        <p className="text-center text-gray-600">No teachers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-500 text-white p-4">
                <h3 className="text-xl font-semibold">{teacher.fullName}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600"><span className="font-semibold">ID:</span> {teacher.id}</p>
                <p className="text-gray-600"><span className="font-semibold">Age:</span> {teacher.age}</p>
                <p className="text-gray-600"><span className="font-semibold">Date of Birth:</span> {new Date(teacher.dateOfBirth).toLocaleDateString()}</p>
                <p className="text-gray-600"><span className="font-semibold">Classes:</span> {teacher.numClasses}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowTeachers;