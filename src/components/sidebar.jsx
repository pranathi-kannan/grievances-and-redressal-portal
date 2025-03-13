import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // External CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile-section">
        <div className="profile-icon">P</div>
        <div className="profile-text">Admin</div>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/grievances">
              <i className="icon-grievance"></i> Grievances
              <span className="notification-dot"></span>
            </Link>
          </li>
          <li>
            <Link to="/history">
              <i className="icon-history"></i> History
            </Link>
          </li>
          <li>
            <Link to="/closed-grievances">
              <i className="icon-closed"></i> Closed Grievances
              <span className="notification-dot"></span>
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <i className="icon-logout"></i> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
