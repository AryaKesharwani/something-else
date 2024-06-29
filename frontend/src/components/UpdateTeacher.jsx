import { useState } from 'react';
import axios from 'axios';

const UpdateTeacher = () => {
  const [form, setForm] = useState({ id: '', fullName: '', age: '', dateOfBirth: '', numClasses: '' });

  const updateTeacher = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:1000/teachers/${form.id}`, form);
    setForm({ id: '', fullName: '', age: '', dateOfBirth: '', numClasses: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Update Teacher</h2>
      <form onSubmit={updateTeacher} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="ID"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />
        </div>
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
        <button type="submit" className="bg-blue-500 text-white p-2">Update Teacher</button>
      </form>
    </div>
  );
};

export default UpdateTeacher;
