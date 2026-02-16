import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AddStudent from "./components/AddStudent.jsx";
import StudentList from "./components/StudentList.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Course from "./components/Course.jsx";
import Enrollment from "./components/Enrollment.jsx";
import Attendance from "./components/Attendance.jsx";

function App() {
  return (
    <Router>
      <div className="container">
        <h2 className="title">Student Management System</h2>

        <div className="nav">
          <Link to="/">Add Student</Link>
          <Link to="/students">View Students</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/enrollment">Enrollment</Link>
          <Link to="/attendance">Attendance</Link>
        </div>

        <Routes>
          <Route path="/" element={<AddStudent />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

