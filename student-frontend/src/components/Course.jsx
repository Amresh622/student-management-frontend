import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://student-management-backend-1-spxg.onrender.com";

function Course() {

  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({
    courseName: "",
    courseCode: ""
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios.get(`${BASE_URL}/courses`)
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${BASE_URL}/courses`, course)
      .then(() => {
        alert("Course Added!");
        setCourse({ courseName: "", courseCode: "" });
        fetchCourses();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/courses/${id}`)
      .then(() => fetchCourses())
      .catch(err => console.error(err));
  };

  return (
    <div className="card">
      <h3>Course Management</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={course.courseName}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="courseCode"
          placeholder="Course Code"
          value={course.courseCode}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Add Course</button>
      </form>

      <hr />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.courseName}</td>
                <td>{c.courseCode}</td>
                <td>
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No Courses Found</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default Course;
