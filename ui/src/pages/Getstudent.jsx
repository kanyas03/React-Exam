import React, { useState } from 'react';

const GetStudent = () => {
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');

  const handleGetStudent = async () => {
    setError('');
    setStudentData(null);

    try {
      const response = await fetch(`/api/getStudent?S_EnrollmentNo=${enrollmentNo}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || 'Failed to fetch student');
      }

      const data = await response.json();
      setStudentData(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Get Student</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <label className="block text-gray-700">Enrollment No:</label>
        <input 
          type="text" 
          value={enrollmentNo} 
          onChange={(e) => setEnrollmentNo(e.target.value)} 
          className="w-full p-2 border rounded mb-2" 
        />
        <button 
          onClick={handleGetStudent} 
          className="w-full p-2 bg-blue-500 text-white font-bold rounded mt-2">
          Get Student
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {studentData && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 mt-4">
          <h2 className="text-xl font-bold">Student Details</h2>
          <p><strong>Name:</strong> {studentData.S_name}</p>
          <p><strong>Enrollment No:</strong> {studentData.S_EnrollmentNo}</p>
          <p><strong>Course:</strong> {studentData.S_coures}</p>
          <p><strong>Date of Enrollment:</strong> {studentData.S_dateOfEnrollment}</p>
        </div>
      )}
    </div>
  );
};

export default GetStudent;
