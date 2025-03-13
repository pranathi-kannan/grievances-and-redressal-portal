import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import Home from './components/Home';
import GrievanceForm from './components/GrievanceForm';
import Anonymous from './components/Anonymous';
import Layout from './components/Layout';
import FacultyLayout from './components/faculty/FacultyLayout';
import History from './components/History';
import Status from './components/Status';
import FacultyHome from './components/faculty/FacultyHome';
import FacultyHistory from './components/faculty/FacultyHistory';
import GrievanceDetails from './components/faculty/GrievanceDetails'; // Correct import

import { UserProvider } from './UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
    return (
        <GoogleOAuthProvider clientId="978300151006-jp8tg8i5cb3pa9ks8rp8o170rb3b1vrd.apps.googleusercontent.com">
            <UserProvider>
                <Router>
                    <Routes>
                        {/* Login and Register without Layout */}
                        <Route path="/" element={<LoginForm />} />
                        <Route path="/register" element={<Register />} />

                        {/* Routes with Sidebar Layout for students */}
                        <Route path="/home" element={<Layout><Home /></Layout>} />
                        <Route path="/grievances" element={<GrievanceForm />} />
                        <Route path="/anonymous" element={<Anonymous />} />
                        <Route path="/history" element={<Layout><History /></Layout>} />
                        <Route path="/Status" element={<Layout><Status/></Layout>} />

                        {/* Routes for Faculty */}
                        <Route path="/FacultyHome" element={<FacultyLayout><FacultyHome /></FacultyLayout>} />
                        <Route path="/faculty/FacultyHistory" element={<FacultyLayout><FacultyHistory /></FacultyLayout>} />
                        
                        {/* Route to Grievance Details page */}
                        <Route path="/faculty/grievances/:id" element={<FacultyLayout><GrievanceDetails /></FacultyLayout>} />
                    </Routes>
                </Router>
            </UserProvider>
        </GoogleOAuthProvider>
    );
};

export default App;
