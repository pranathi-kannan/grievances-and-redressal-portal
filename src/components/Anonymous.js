import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './GrievanceForm.css'; // Reuse the same CSS for consistency

const AnonymousGrievanceForm = () => {
    const [errorMessage, setErrorMessage] = useState(''); // State to track any errors
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const grievanceData = {
            to: event.target.to.value,
            subject: event.target.subject.value,
            issue: event.target.issue.value,
        };

        try {
            // Send data to the backend via API
            const response = await fetch('http://localhost:5000/api/anonymous', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(grievanceData),
            });

            if (response.ok) {
                // Redirect to home page after successful submission
                navigate('/home');
            } else {
                const result = await response.json();
                setErrorMessage(result.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error submitting anonymous grievance:', error);
            setErrorMessage('An error occurred while submitting your grievance.');
        }
    };

    return (
        <div className="grievance-form-container">
            <div className="grievance-form">
                <h2>Submit Your Grievance Anonymously</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>To:</label>
                        <select name="to" className="input-field" required>
                            <option value="department1">Mentor</option>
                            <option value="department2">M-Team</option>
                            <option value="department3">Office Academics</option>
                            <option value="department4">TAC</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Regarding:</label>
                        <input type="text" name="subject" placeholder="Subject" required />
                    </div>
                    <div className="form-group">
                        <label>Issue Faced:</label>
                        <textarea name="issue" placeholder="Describe your issue" required></textarea>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AnonymousGrievanceForm;
