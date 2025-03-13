import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GrievanceDetails.css';

const GrievanceDetails = () => {
    const { id } = useParams(); // Get the grievance ID from the URL
    const [grievance, setGrievance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(''); // State for reply input
    const [status, setStatus] = useState('Pending'); // State for status dropdown
    const navigate = useNavigate();

    // Fetch the grievance details
    useEffect(() => {
        const fetchGrievance = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/grievances/${id}`);
    
                console.log('Response Status:', res.status);
                const text = await res.text();
                console.log('Response Body:', text);
    
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
    
                const data = JSON.parse(text);
                setGrievance(data);
                setResponse(data.response || ''); // Set initial response if available
                setStatus(data.status || 'Pending'); // Set initial status if available
                setLoading(false);
            } catch (error) {
                console.error('Error fetching grievance:', error);
                setError(error.message);
                setLoading(false);
            }
        };
    
        fetchGrievance();
    }, [id]);

    // Function to handle form submission (Update grievance reply and status)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:5000/api/grievances/${id}/reply`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ response, status }),  // Send response and status
            });

            if (res.ok) {
                alert('Grievance updated successfully!');
                navigate('/facultyHome');  // Redirect to faculty home page
            } else {
                alert('Failed to update grievance');
            }
        } catch (error) {
            console.error('Error updating grievance:', error);
            alert('An error occurred. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading grievance details...</div>;
    }

    if (error) {
        return <div>Error fetching grievance: {error}</div>;
    }

    return (
        <div className="grievance-details">
            <h2>Grievance Details</h2>
            <div>
                <strong>Email:</strong> {grievance.email}
            </div>
            <div>
                <strong>To:</strong> {grievance.to}
            </div>
            <div>
                <strong>Subject:</strong> {grievance.subject}
            </div>
            <div>
                <strong>Issue:</strong> {grievance.issue}
            </div>

            <form onSubmit={handleSubmit} className="grievance-form">
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pending">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="response">Reply:</label>
                    <textarea
                        id="response"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Enter reply here..."
                        rows="4"
                    />
                </div>

                <button type="submit" className="update-btn">Update Grievance</button>
            </form>
        </div>
    );
};

export default GrievanceDetails;
