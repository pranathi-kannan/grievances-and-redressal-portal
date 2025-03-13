import React from 'react';
import { Outlet } from 'react-router-dom';
import './MainContent.css'; // External CSS for main content

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <div className="chat-section">
        <div className="message">
          <div className="avatar">A</div>
          <div className="message-box">
            <p>Your message here...</p>
            <button>Reply</button>
          </div>
        </div>
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type here" />
      </div>
    </div>
  );
};

export default MainContent;
