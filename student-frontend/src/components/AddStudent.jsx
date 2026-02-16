import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://student-management-backend-1-spxg.onrender.com";

function AddStudent() {

  const [student, setStudent] = useState({
    id: "",
    name: "",
    email: "",
    department: ""
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (student.id) {
      // UPDATE
      axios.put(`${BASE_URL}/students/${student.id}`, student)
        .then(() => {
          alert("Student Updated Successfully!");
          resetForm();
        })
        .catch(err => console.error(err));
    } else {
      // CREATE
      axios.post(`${BASE_URL}/students`, student)
        .then(() => {
          alert("Student Added Successfully!");
          resetForm();
        })
        .catch(err => console.error(err));
    }
  };

  const resetForm = () => {
    setStudent({ id: "", name: "", email: "", department: "" });
  };

  return (
    <div className="card">
      <h3>{student.id ? "Update Student" : "Add Student"}</h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="id"
          placeholder="Enter ID to Update (leave empty for new)"
          value={student.id}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="department"
          placeholder="Enter Department"
          value={student.department}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          {student.id ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
