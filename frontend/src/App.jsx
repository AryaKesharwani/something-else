// import { useState, useEffect } from "react";


// const apiUrl = "http://localhost:1000/teachers";

// const App = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [form, setForm] = useState({
//     fullName: "",
//     age: "",
//     dateOfBirth: "",
//     numClasses: "",
//   });
//   const [searchName, setSearchName] = useState("");

//   useEffect(() => {
//     loadTeachers();
//   }, []);

//   const loadTeachers = async () => {
//     const response = await axios.get(apiUrl);
//     setTeachers(response.data);
//   };

//   const addTeacher = async (e) => {
//     e.preventDefault();
//     await axios.post(apiUrl, form);
//     setForm({ fullName: "", age: "", dateOfBirth: "", numClasses: "" });
//     loadTeachers();
//   };

//   const searchTeacher = async (e) => {
//     e.preventDefault();
//     const response = await axios.get(`${apiUrl}/search?name=${searchName}`);
//     setTeachers(response.data);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Teacher Management System</h1>

//       <form onSubmit={addTeacher} className="mb-4">
//         <div className="mb-2">
//           <input
//             type="text"
//             className="border p-2 w-full"
//             placeholder="Full Name"
//             value={form.fullName}
//             onChange={(e) => setForm({ ...form, fullName: e.target.value })}
//           />
//         </div>
//         <div className="mb-2">
//           <input
//             type="number"
//             className="border p-2 w-full"
//             placeholder="Age"
//             value={form.age}
//             onChange={(e) => setForm({ ...form, age: e.target.value })}
//           />
//         </div>
//         <div className="mb-2">
//           <input
//             type="date"
//             className="border p-2 w-full"
//             value={form.dateOfBirth}
//             onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
//           />
//         </div>
//         <div className="mb-2">
//           <input
//             type="number"
//             className="border p-2 w-full"
//             placeholder="Number of Classes"
//             value={form.numClasses}
//             onChange={(e) => setForm({ ...form, numClasses: e.target.value })}
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2">
//           Add Teacher
//         </button>
//       </form>

//       <form onSubmit={searchTeacher} className="mb-4">
//         <div className="mb-2">
//           <input
//             type="text"
//             className="border p-2 w-full"
//             placeholder="Search by Name"
//             value={searchName}
//             onChange={(e) => setSearchName(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2">
//           Search
//         </button>
//       </form>

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




import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import ShowTeachers from './components/ShowTeachers';
import AddTeacher from './components/AddTeacher';
import FilterTeachers from './components/FilterTeachers';
import SearchTeacher from './components/SearchTeacher';
import UpdateTeacher from './components/UpdateTeacher';
import DeleteTeacher from './components/DeleteTeacher';
import Dashboard from './components/Dashboard';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { to: "/", text: "Home" },
    { to: "/teachers", text: "Show All Teachers" },
    { to: "/add-teacher", text: "Add Teacher" },
    { to: "/filter-teachers", text: "Filter Teachers" },
    { to: "/search-teacher", text: "Search Teacher" },
    { to: "/update-teacher", text: "Update Teacher" },
    { to: "/delete-teacher", text: "Delete Teacher" },
    { to: "/dashboard", text: "Dashboard" },
  ];

  return (
    <BrowserRouter basename="/">
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl">TMS</Link>
          <div className="hidden md:flex space-x-4">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.to} className="text-white hover:text-blue-200">{item.text}</Link>
            ))}
          </div>
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-blue-400"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.to} 
                className="block py-2 px-4 text-white hover:bg-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.text}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto p-4">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/teachers" element={<ShowTeachers />} />
          <Route exact path="/add-teacher" element={<AddTeacher />} />
          <Route exact path="/filter-teachers" element={<FilterTeachers />} />
          <Route exact path="/search-teacher" element={<SearchTeacher />} />
          <Route exact path="/update-teacher" element={<UpdateTeacher />} />
          <Route exact path="/delete-teacher" element={<DeleteTeacher />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
