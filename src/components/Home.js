import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [grievances, setGrievances] = useState([]);

    useEffect(() => {
        // Fetch grievances from the backend
        fetch('http://localhost:5000/api/grievances')
            .then(response => response.json())
            .then(data => {
                setGrievances(data); // Store grievances in state
            })
            .catch(error => console.error('Error fetching grievances:', error));
    }, []); // Empty dependency array ensures this runs once after component mounts

    return (
        <div className="dashboard">
            <h2>Recent Grievances</h2>
            <table className="grievance-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>To</th>
                        <th>Subject</th>
                        <th>Issue</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {grievances.length > 0 ? grievances.map(grievance => (
                        <tr key={grievance._id}>
                            <td>{grievance.email}</td>
                            <td>{grievance.to}</td>
                            <td>{grievance.subject}</td>
                            <td>{grievance.issue}</td>
                            <td>{new Date(grievance.createdAt).toLocaleDateString()}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="5">No grievances found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
