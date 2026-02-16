import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://student-management-backend-1-spxg.onrender.com";

function Enrollment() {

  const [enrollments, setEnrollments] = useState([]);
  const [data, setData] = useState({
    studentId: "",
    courseId: ""
  });

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = () => {
    axios.get(`${BASE_URL}/enrollments`)
      .then(res => setEnrollments(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${BASE_URL}/enrollments`, data)
      .then(() => {
        alert("Enrollment Added!");
        setData({ studentId: "", courseId: "" });
        fetchEnrollments();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="card">
      <h3>Enrollment</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="studentId"
          placeholder="Student ID"
          value={data.studentId}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="courseId"
          placeholder="Course ID"
          value={data.courseId}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Enroll</button>
      </form>

      <hr />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Course ID</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.length > 0 ? (
            enrollments.map(e => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.studentId}</td>
                <td>{e.courseId}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Enrollments Found</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default Enrollment;
