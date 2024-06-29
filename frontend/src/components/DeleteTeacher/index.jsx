import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const DeleteTeacher = () => {
  const [teacherId, setTeacherId] = useState('');

  const deleteTeacher = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:1000/teachers/${teacherId}`);
      toast.success('Teacher record deleted successfully!');
      setTeacherId('');
    } catch (error) {
      toast.error('Error deleting teacher record!');
    }
  };
  

  return (
    <div className="container mx-auto p-4">
       <ToastContainer  />
      <h2 className="text-xl font-bold mb-4">Delete Teacher</h2>
      <form onSubmit={deleteTeacher} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="ID"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-red-500 text-white p-2">Delete Teacher</button>
      </form>
    </div>
  );
};

export default DeleteTeacher;
