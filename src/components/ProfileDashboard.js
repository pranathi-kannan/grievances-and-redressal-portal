import React, { useEffect, useState } from "react";

const ProfileDashboard = () => {
  const [registers, setUserDetails] = useState(null);

  // Fetch user details after logging in
  useEffect(() => {
    // Assuming you have an API endpoint that returns the logged-in user's details
    fetch("/api/registers", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in local storage
      },
    })
      .then((response) => response.json())
      .then((data) => setUserDetails(data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, []);

  if (!registers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {registers.name}</h1>
      <div className="profile-section">
        <h2>Your Profile</h2>
        <p><strong>Email:</strong> {registers.email}</p>
        {/* <p><strong>Department:</strong> {registers.department}</p> */}
        {/* Add more profile details here */}
      </div>

      <div className="dashboard-section">
        <h2>Dashboard</h2>
        <button onClick={() => window.location.href = '/submitted-grievances'}>
          View Submitted Grievances
        </button>
        <button onClick={() => window.location.href = '/new-grievance'}>
          Add New Grievance
        </button>
        <button onClick={() => window.location.href = '/grievance-status'}>
          View Grievance Status
        </button>
      </div>
    </div>
  );
};

export default ProfileDashboard;
