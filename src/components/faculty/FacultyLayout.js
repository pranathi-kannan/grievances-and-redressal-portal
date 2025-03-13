import React from 'react';
import { Link } from 'react-router-dom';
//import './Layout.css';

const Layout = ({username, children }) => {
    return (
        <div className="layout">
            <div className="sidebar">
                <h2>Grievance Portal</h2>
                <ul>
                    <li><Link to="/facultyHome">Dashboard</Link></li>
                    {/* <li><Link to="/faculty/grievances">Resolved Grievances</Link></li> */}
                    <li><Link to="/faculty/FacultyHistory">History</Link></li>
                    <li><Link to="/" onClick={() => { /* Add logout logic here */ }}>Logout</Link></li>
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
