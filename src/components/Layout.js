// Layout.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css'; // Make sure to style it as per your design

const Layout = ({username, children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any session, token, or user data here if necessary
        navigate('/'); // Redirect to login page
    };

    return (
        <div className="layout-container">
            <div className="sidebar">
                <h2>Grievances Portal</h2>
                <ul>
                    <li><Link to="/grievances">Grievances</Link></li>
                    <li><Link to="/anonymous">Anonymous Grievance</Link></li>
                    <li><Link to="/status">Status</Link></li>
                    <li><Link to="/History">History</Link></li>
                    <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
            <div className="main-content">
                <h1>Welcome, {username}</h1>
                {children}
            </div>
        </div>
    );
};

export default Layout;
