import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://student-management-backend-1-spxg.onrender.com";

function StudentList() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get(`${BASE_URL}/students`)
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios.delete(`${BASE_URL}/students/${id}`)
        .then(() => fetchStudents())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="card">
      <h3>Student List</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>
                  <button
                    style={{ backgroundColor: "red", marginRight: "5px" }}
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Students Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
