import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://student-management-backend-1-spxg.onrender.com";

function Attendance() {

  const [attendanceList, setAttendanceList] = useState([]);
  const [filterId, setFilterId] = useState("");

  const [attendance, setAttendance] = useState({
    studentId: "",
    courseId: "",
    date: "",
    status: ""
  });

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = () => {
    axios.get(`${BASE_URL}/attendance`)
      .then(res => setAttendanceList(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${BASE_URL}/attendance`, attendance)
      .then(() => {
        alert("Attendance Added!");
        setAttendance({
          studentId: "",
          courseId: "",
          date: "",
          status: ""
        });
        fetchAttendance();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/attendance/${id}`)
      .then(() => fetchAttendance())
      .catch(err => console.error(err));
  };

  const handleFilter = () => {
    if (!filterId) {
      fetchAttendance();
      return;
    }

    axios.get(`${BASE_URL}/attendance`)
      .then(res => {
        const filtered = res.data.filter(a =>
          a.studentId.toString() === filterId
        );
        setAttendanceList(filtered);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="card">
      <h3>Attendance Tracking</h3>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="studentId"
          placeholder="Student ID"
          value={attendance.studentId}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="courseId"
          placeholder="Course ID"
          value={attendance.courseId}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="date"
          name="date"
          value={attendance.date}
          onChange={handleChange}
          required
        />
        <br /><br />

        <select
          name="status"
          value={attendance.status}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <br /><br />

        <button type="submit">Add Attendance</button>
      </form>

      <hr />

      <h4>Filter by Student ID</h4>

      <input
        type="number"
        placeholder="Enter Student ID"
        value={filterId}
        onChange={(e) => setFilterId(e.target.value)}
      />
      <button onClick={handleFilter} style={{ marginLeft: "10px" }}>
        Filter
      </button>

      <hr />

      <h4>Attendance Records</h4>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Course ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.length > 0 ? (
            attendanceList.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.studentId}</td>
                <td>{a.courseId}</td>
                <td>{a.date}</td>
                <td>{a.status}</td>
                <td>
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleDelete(a.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Attendance Found</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default Attendance;
