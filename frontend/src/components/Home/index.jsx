
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Teacher Management System</h1>
//       <ul className="list-disc pl-5">
//         <li className="mb-2"><Link className="text-blue-500" to="/teachers">Show all teachers</Link></li>
//         <li className="mb-2"><Link className="text-blue-500" to="/add-teacher">Add a teacher</Link></li>
//         <li className="mb-2"><Link className="text-blue-500" to="/filter-teachers">Filter teachers based on criteria</Link></li>
//         <li className="mb-2"><Link className="text-blue-500" to="/search-teacher">Search for a teacher</Link></li>
        
//         <li className="mb-2"><Link className="text-blue-500" to="/update-teacher">Update a teacher's record</Link></li>
//         <li className="mb-2"><Link className="text-blue-500" to="/delete-teacher">Delete a teacher</Link></li>
//       </ul>
//     </div>
//   );
// };

// export default Home;


import { Link } from 'react-router-dom';

const Home = () => {
  const menuItems = [
    { to: "/teachers", text: "Show all teachers", icon: "👥" },
    { to: "/add-teacher", text: "Add a teacher", icon: "➕" },
    { to: "/filter-teachers", text: "Filter teachers", icon: "🔍" },
    { to: "/search-teacher", text: "Search for a teacher", icon: "🔎" },
    { to: "/update-teacher", text: "Update a teacher's record", icon: "✏️" },
    { to: "/delete-teacher", text: "Delete a teacher", icon: "🗑️" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Teacher Management System
        </h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {menuItems.map((item, index) => (
            <Link 
              key={index}
              to={item.to}
              className="block hover:bg-blue-50 transition duration-150 ease-in-out"
            >
              <div className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                <span className="text-2xl mr-4">{item.icon}</span>
                <span className="text-lg text-gray-700 hover:text-blue-600">{item.text}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;