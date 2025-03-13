import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './GrievanceForm.css'; 

const GrievanceForm = () => {
    const [email, setEmail] = useState('');
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [issue, setIssue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate(); // Initialize the navigate hook

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !to || !subject || !issue) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        const grievanceData = { email, to, subject, issue };

        try {
            const response = await axios.post('http://localhost:5000/api/grievances', grievanceData);
            if (response.status === 201) {
                alert('Grievance submitted successfully.');
                setEmail('');
                setTo('');
                setSubject('');
                setIssue('');
                navigate('/home'); // Redirect to home page after successful submission
            } else {
                setErrorMessage('Failed to submit grievance. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while submitting the grievance.');
            console.error('Grievance submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grievance-form-container">
            <div className="grievance-form">
                <h2>Submit Your Grievance</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Id:</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>To:</label>
                        <select 
                            className="input-field" 
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="Mentor">Mentor</option>
                            <option value="M-Team">M-Team</option>
                            <option value="Office Academics">Office Academics</option>
                            <option value="TAC">TAC</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Regarding:</label>
                        <input 
                            type="text" 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Subject" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Issue Faced:</label>
                        <textarea 
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                            placeholder="Describe your issue" 
                            required 
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GrievanceForm;
