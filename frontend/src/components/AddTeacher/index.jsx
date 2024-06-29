import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const AddTeacher = () => {
  const [form, setForm] = useState({ fullName: '', age: '', dateOfBirth: '', numClasses: '' });

  const validateForm = () => {
    const age = parseInt(form.age);
    if (isNaN(age) || age < 0 || age > 100) {
      toast.error('Age must be between 0 and 100');
      return false;
    }

    const birthDate = new Date(form.dateOfBirth);
    const today = new Date();
    const calculatedAge = today.getFullYear() - birthDate.getFullYear();
    
    if (calculatedAge !== age) {
      toast.error('Date of birth does not match the provided age');
      return false;
    }

    return true;
  };

  const addTeacher = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:1000/teachers', form);
        setForm({ fullName: '', age: '', dateOfBirth: '', numClasses: '' });
        toast.success('Teacher added successfully!');
      } catch (error) {
        toast.error('Failed to add teacher. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-xl font-bold mb-4">Add Teacher</h2>
      <form onSubmit={addTeacher} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <input
            type="date"
            className="border p-2 w-full"
            value={form.dateOfBirth}
            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Number of Classes"
            value={form.numClasses}
            onChange={(e) => setForm({ ...form, numClasses: e.target.value })}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">Add Teacher</button>
      </form>
    </div>
  );
};

export default AddTeacher;