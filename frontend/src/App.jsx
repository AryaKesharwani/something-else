// import { useState, useEffect } from "react";
// import axios from "axios";

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

// export default App;




import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import ShowTeachers from './components/ShowTeachers';
import AddTeacher from './components/AddTeacher';
import FilterTeachers from './components/FilterTeachers';
import SearchTeacher from './components/SearchTeacher';
import UpdateTeacher from './components/UpdateTeacher';
import DeleteTeacher from './components/DeleteTeacher';

const App = () => {
  return (
    <BrowserRouter>
      <nav className="bg-blue-500 p-4 text-white">
        <Link className="mr-4" to="/">Home</Link>
        <Link className="mr-4" to="/teachers">Show All Teachers</Link>
        <Link className="mr-4" to="/add-teacher">Add Teacher</Link>
        <Link className="mr-4" to="/filter-teachers">Filter Teachers</Link>
        <Link className="mr-4" to="/search-teacher">Search Teacher</Link>
        <Link className="mr-4" to="/update-teacher">Update Teacher</Link>
        <Link className="mr-4" to="/delete-teacher">Delete Teacher</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/teachers" component={ShowTeachers} />
        <Route exact path="/add-teacher" component={AddTeacher} />
        <Route exact path="/filter-teachers" component={FilterTeachers} />
        <Route exact path="/search-teacher" component={SearchTeacher} />
        <Route exact path="/update-teacher" component={UpdateTeacher} />
        <Route exact path="/delete-teacher" component={DeleteTeacher} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
