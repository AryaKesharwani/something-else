import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:1000/teachers/dashboard');
        setDashboardData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Total Teachers" value={dashboardData.totalTeachers} />
        <DashboardCard title="Teachers Added (Last Hour)" value={dashboardData.teachersLastHour} />
        <DashboardCard title="Avg Classes per Teacher" value={dashboardData.averageClassesPerTeacher} />
        <DashboardCard 
          title="Youngest Teacher" 
          value={`${dashboardData.youngestTeacher.fullName} (${dashboardData.youngestTeacher.age} years)`} 
        />
        <DashboardCard 
          title="Oldest Teacher" 
          value={`${dashboardData.oldestTeacher.fullName} (${dashboardData.oldestTeacher.age} years)`} 
        />
      </div>
    </div>
  );
};

import PropTypes from 'prop-types';

const DashboardCard = ({ title, value }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-3xl font-bold text-blue-600">{value}</p>
  </div>
);

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};


export default Dashboard;