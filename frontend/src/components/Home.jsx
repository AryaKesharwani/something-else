
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Management System</h1>
      <ul className="list-disc pl-5">
        <li className="mb-2"><Link className="text-blue-500" to="/teachers">Show all teachers</Link></li>
        <li className="mb-2"><Link className="text-blue-500" to="/add-teacher">Add a teacher</Link></li>
        <li className="mb-2"><Link className="text-blue-500" to="/filter-teachers">Filter teachers based on criteria</Link></li>
        <li className="mb-2"><Link className="text-blue-500" to="/search-teacher">Search for a teacher</Link></li>
        
        <li className="mb-2"><Link className="text-blue-500" to="/update-teacher">Update a teacher's record</Link></li>
        <li className="mb-2"><Link className="text-blue-500" to="/delete-teacher">Delete a teacher</Link></li>
      </ul>
    </div>
  );
};

export default Home;
