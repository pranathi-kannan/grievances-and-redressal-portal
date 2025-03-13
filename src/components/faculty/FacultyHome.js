import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FacultyHome.css';

const FacultyHome = () => {
    const [grievances, setGrievances] = useState([]);

    useEffect(() => {
        // Fetch grievances from the backend
        fetch('http://localhost:5000/api/grievances')  // Ensure this endpoint exists in the backend
            .then(response => response.json())
            .then(data => {
                setGrievances(data);  // Store grievances in state
            })
            .catch(error => console.error('Error fetching grievances:', error));
    }, []);

    // Function to format the date
    // const formatDate = (dateString) => {
    //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //     const date = new Date(dateString);
        
    //     // Check if the date is valid
    //     if (!isNaN(date.getTime())) {
    //         return date.toLocaleDateString(undefined, options);
    //     } else {
    //         return 'Invalid Date';
    //     }
    // };
    

    return (
        <div className="faculty-dashboard">
            <h2>Submitted Grievances</h2>
            <table className="grievance-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>To</th>
                        <th>Subject</th>
                        <th>Issue</th>
                        <th>Date</th>
                        <th>Actions</th>  {/* Add Actions column */}
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
                            <td>
                                {/* Add View button that links to the detailed grievance page */}
                                <Link to={`/faculty/grievances/${grievance._id}`}>View</Link>

                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="6">No grievances found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FacultyHome;
