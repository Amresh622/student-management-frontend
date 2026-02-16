import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://student-management-backend-1-spxg.onrender.com";

function Dashboard() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get(`${BASE_URL}/students`)
      .then(res => setCount(res.data.length))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="card">
      <h3>Dashboard</h3>
      <p>Total Students: <strong>{count}</strong></p>
    </div>
  );
}

export default Dashboard;

