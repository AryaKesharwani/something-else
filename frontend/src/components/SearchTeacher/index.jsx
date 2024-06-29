// import { useState } from 'react';
// import axios from 'axios';

// const SearchTeacher = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [searchName, setSearchName] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const searchTeacher = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`http://localhost:1000/teachers/search?name=${searchName}`);
//       setTeachers(response.data);
//     } catch (err) {
//       setError('Failed to fetch teachers. Please try again.');
//       setTeachers([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-3xl">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Search Teacher</h2>
//       <form onSubmit={searchTeacher} className="mb-8">
//         <div className="flex items-center mb-4">
//           <input
//             type="text"
//             className="flex-grow border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Search by Name"
//             value={searchName}
//             onChange={(e) => setSearchName(e.target.value)}
//           />
//           <button 
//             type="submit" 
//             className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Searching...' : 'Search'}
//           </button>
//         </div>
//       </form>

//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//       {isLoading ? (
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-2 text-gray-600">Searching for teachers...</p>
//         </div>
//       ) : teachers.length > 0 ? (
//         <div className="grid gap-4">
//           {teachers.map((teacher) => (
//             <div key={teacher.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
//               <div className="bg-blue-500 text-white p-4">
//                 <h3 className="text-xl font-semibold">{teacher.fullName}</h3>
//               </div>
//               <div className="p-4 grid grid-cols-2 gap-2">
//                 <p className="text-gray-600"><span className="font-semibold">ID:</span> {teacher.id}</p>
//                 <p className="text-gray-600"><span className="font-semibold">Age:</span> {teacher.age}</p>
//                 <p className="text-gray-600 col-span-2"><span className="font-semibold">Date of Birth:</span> {new Date(teacher.dateOfBirth).toLocaleDateString()}</p>
//                 <p className="text-gray-600 col-span-2"><span className="font-semibold">Classes:</span> {teacher.numClasses}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : searchName && (
//         <p className="text-center text-gray-600">No teachers found matching "{searchName}".</p>
//       )}
//     </div>
//   );
// };

// export default SearchTeacher;


import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const SearchTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const searchTeacher = useCallback(
    debounce(async (name) => {
      if (!name) {
        setTeachers([]);
        return;
      }
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.get(`http://localhost:1000/teachers/search?name=${name}`);
        setTeachers(response.data);
      } catch (err) {
        setError('Failed to fetch teachers. Please try again.');
        setTeachers([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    searchTeacher(searchName);
  }, [searchName, searchTeacher]);

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Search Teacher</h2>
      <div className="mb-8">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by Name"
          value={searchName}
          onChange={handleSearchChange}
        />
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Searching for teachers...</p>
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
      ) : searchName && (
        <p className="text-center text-gray-600">No teachers found matching &quot;{searchName}&quot;.</p>
      )}
    </div>
  );
};

export default SearchTeacher;