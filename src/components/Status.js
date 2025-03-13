import React, { useEffect, useState } from 'react';

const StatusPage = () => {
    const [grievances, setGrievances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch grievances with status from the backend
        const fetchGrievances = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/grievances');
                if (!response.ok) {
                    throw new Error('Failed to fetch grievances');
                }
                const data = await response.json();
                setGrievances(data); // Store grievances in state
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchGrievances();
    }, []); // Empty dependency array ensures this runs once after component mounts

    if (loading) {
        return <div>Loading grievances...</div>;
    }

    if (error) {
        return <div>Error fetching grievances: {error}</div>;
    }

    return (
        <div className="status-page">
            <h2>Grievance Status</h2>
            <table className="grievance-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>To</th>
                        <th>Subject</th>
                        <th>Issue</th>
                        <th>Date</th>
                        <th>Status</th>
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
                            <td>{grievance.status || 'Open'}</td> {/* Display status */}
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

export default StatusPage;
