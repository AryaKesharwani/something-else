// import { useState } from 'react';
// import axios from 'axios';

// const FilterTeachers = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [filter, setFilter] = useState({ minAge: '', maxAge: '', minClasses: '', maxClasses: '' });

//   const filterByAge = async () => {
//     const response = await axios.get('http://localhost:1000/teachers/filter/age', {
//       params: {
//         minAge: filter.minAge,
//         maxAge: filter.maxAge
//       }
//     });
//     setTeachers(response.data);
//   };

//   const filterByClasses = async () => {
//     const response = await axios.get('http://localhost:1000/teachers/filter/classes', {
//       params: {
//         minClasses: filter.minClasses,
//         maxClasses: filter.maxClasses
//       }
//     });
//     setTeachers(response.data);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Filter Teachers</h2>
//       <div className="mb-4">
//         <h3 className="font-bold mb-2">Filter by Age</h3>
//         <input
//           type="number"
//           className="border p-2 mr-2"
//           placeholder="Min Age"
//           value={filter.minAge}
//           onChange={(e) => setFilter({ ...filter, minAge: e.target.value })}
//         />
//         <input
//           type="number"
//           className="border p-2"
//           placeholder="Max Age"
//           value={filter.maxAge}
//           onChange={(e) => setFilter({ ...filter, maxAge: e.target.value })}
//         />
//         <button onClick={filterByAge} className="bg-blue-500 text-white p-2 ml-2">Filter</button>
//       </div>

//       <div className="mb-4">
//         <h3 className="font-bold mb-2">Filter by Number of Classes</h3>
//         <input
//           type="number"
//           className="border p-2 mr-2"
//           placeholder="Min Classes"
//           value={filter.minClasses}
//           onChange={(e) => setFilter({ ...filter, minClasses: e.target.value })}
//         />
//         <input
//           type="number"
//           className="border p-2"
//           placeholder="Max Classes"
//           value={filter.maxClasses}
//           onChange={(e) => setFilter({ ...filter, maxClasses: e.target.value })}
//         />
//         <button onClick={filterByClasses} className="bg-blue-500 text-white p-2 ml-2">Filter</button>
//       </div>

//       <div>
//         {teachers.map((teacher) => (
//           <div key={teacher.id} className="border p-2 mb-2">
//             <p>ID: {teacher.id}</p>
//             <p>Name: {teacher.fullName}</p>
//             <p>Age: {teacher.age}</p>
//             <p>Date of Birth: {teacher.dateOfBirth}</p>
//             <p>Number of Classes: {teacher.numClasses}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FilterTeachers;



import { useState } from 'react';
import axios from 'axios';

const FilterTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [filter, setFilter] = useState({ minAge: '', maxAge: '', minClasses: '', maxClasses: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:1000/teachers/filter', {
        params: {
          minAge: filter.minAge || undefined,
          maxAge: filter.maxAge || undefined,
          minClasses: filter.minClasses || undefined,
          maxClasses: filter.maxClasses || undefined
        }
      });
      setTeachers(response.data);
    } catch (err) {
      setError('Failed to fetch teachers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Filter Teachers</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Age</label>
            <input
              type="number"
              name="minAge"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min Age"
              value={filter.minAge}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Age</label>
            <input
              type="number"
              name="maxAge"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Max Age"
              value={filter.maxAge}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Classes</label>
            <input
              type="number"
              name="minClasses"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min Classes"
              value={filter.minClasses}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Classes</label>
            <input
              type="number"
              name="maxClasses"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Max Classes"
              value={filter.maxClasses}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <button 
          onClick={applyFilters} 
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isLoading}
        >
          {isLoading ? 'Filtering...' : 'Apply Filters'}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Filtering teachers...</p>
        </div>
      ) : teachers.length > 0 ? (
        <div className="grid gap-4">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-500 text-white p-4">
                <h3 className="text-xl font-semibold">{teacher.fullName}</h3>
              </div>
              <div className="p-4 grid grid-cols-2 gap-2">
                <p className="text-gray-600"><span className="font-semibold">ID:</span> {teacher.id}</p>
                <p className="text-gray-600"><span className="font-semibold">Age:</span> {teacher.age}</p>
                <p className="text-gray-600 col-span-2"><span className="font-semibold">Date of Birth:</span> {new Date(teacher.dateOfBirth).toLocaleDateString()}</p>
                <p className="text-gray-600 col-span-2"><span className="font-semibold">Classes:</span> {teacher.numClasses}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No teachers found matching the current filters.</p>
      )}
    </div>
  );
};

export default FilterTeachers;