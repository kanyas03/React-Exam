import React, { useState } from 'react';

const Addstudent = () => {
  const [studentName, setStudentName] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [course, setCourse] = useState('');
  const [dateOfEnrollment, setDateOfEnrollment] = useState('');
  const [error, setError] = useState('');


  const handleAddstudent = async (e) => {
    e.preventDefault();
    setError('');
   

    if (!studentName || !enrollmentNo || !course || !dateOfEnrollment) {
      setError('All fields are required!');
      return;
    }

    try {
      const response = await fetch('/api/addstudent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          StudentName: studentName,
          EnrollmentNumber: enrollmentNo,
          Course: course,
          DateOfEnrollment: dateOfEnrollment,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || 'Failed to add student');
      }

      alert('Student added successfully!');
      setStudentName('');
      setEnrollmentNo('');
      setCourse('');
      setDateOfEnrollment('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again!');
    } 
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Add Student</h1>
      
      <form onSubmit={handleAddstudent} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <label className="block text-gray-700">Student Name:</label>
        <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)}
          className="w-full p-2 border rounded mb-2" required />

        <label className="block text-gray-700">Enrollment No:</label>
        <input type="text" value={enrollmentNo} onChange={(e) => setEnrollmentNo(e.target.value)}
          className="w-full p-2 border rounded mb-2" required />

        <label className="block text-gray-700">Course Name:</label>
        <input type="text" value={course} onChange={(e) => setCourse(e.target.value)}
          className="w-full p-2 border rounded mb-2" required />

        <label className="block text-gray-700">Date of Enrollment:</label>
        <input type="date" value={dateOfEnrollment} onChange={(e) => setDateOfEnrollment(e.target.value)}
          className="w-full p-2 border rounded mb-2" required />

        <button type="submit" className="w-full p-2 bg-blue-500 text-white font-bold rounded mt-2">
            Add Student
        </button>
      </form>
    </div>
  );
};

export default Addstudent;
