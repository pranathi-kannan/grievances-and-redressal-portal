import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { UserContext } from '../UserContext';
import { useGoogleLogin } from '@react-oauth/google';
//import {jwtDecode} from 'jwt-decode'; // Correct jwtDecode import
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Function to check if email contains numbers (to differentiate students)
    const isStudentEmail = (email) => /\d/.test(email); // Returns true if email contains numbers

    // Google login handler
    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Fetch user info using the access token
                const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });
    
                const googleUser = await response.json();
                setUser({ username: googleUser.email });
    
                // Redirect based on email type
                if (isStudentEmail(googleUser.email)) {
                    navigate('/Home'); // Redirect to student profile
                } else {
                    navigate('/FacultyHome'); // Redirect to faculty profile
                }
            } catch (error) {
                console.error("Error fetching Google user info:", error);
                setError("Google login failed. Please try again.");
            }
        },
        onError: (errorResponse) => {
            console.error('Google login failed:', errorResponse);
            setError('Google login failed. Please try again.');
        }
    });
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login success:', data);
                setUser({ username: data.user.email });

                // Redirect based on email type
                if (isStudentEmail(data.user.email)) {
                    navigate('/Home'); // Redirect to student profile
                } else {
                    navigate('/FacultyHome'); // Redirect to faculty profile
                }
            } else {
                console.log('Login failed:', data);
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <div className='img'>
                    <img src='https://upload.wikimedia.org/wikipedia/en/7/77/Bannari_Amman_Institute_of_Technology_logo.png' alt='BIT' />
                </div>
                <h1>Grievances Portal</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder='Username' 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <FaRegUser className='icon' />
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder='Password' 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <RiLockPasswordLine className='icon' style={{fontSize: "20px"}} />
                </div>
                <div className='login'>
                    <button type='Submit'>Login</button>
                </div>
                <br />
                <div className="register">
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>
                <div className="or">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ flex: 1, backgroundColor: "black", height: "1px" }} />
                        <p style={{ margin: "0 5px" }}>OR</p>
                        <div style={{ flex: 1, backgroundColor: "black", height: "1px" }} />
                    </div>
                    <div className='google'>
                        <button 
                            type="button" 
                            style={{ margin: "20px 0", backgroundColor: "#63b5f4", color: "#333", padding: "10px 20px", fontweight: "700", borderRadius: "40px", border: "none", fontsize: "16px", cursor: "pointer" }}
                            onClick={loginWithGoogle}
                        >
                            Continue with Google
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
