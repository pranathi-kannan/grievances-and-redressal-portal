import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Optional loading state

  const styles = {
    page: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'white',
    },
    box: {
      position: 'relative',
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '420px',
      marginTop: '30px',
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#333',
    },
    h2: {
      marginBottom: '1.5rem',
      color: '#333',
    },
    inputGroup: {
      marginBottom: '1.5rem',
      textAlign: 'left',
    },
    inputWrapper: {
      position: 'relative',
    },
    input: {
      width: '95%',
      padding: '0.75rem',
      paddingLeft: '2.5rem',
      borderRadius: '10px',
      border: '1px solid #ccc',
      color: '#425C5A',
    },
    icon: {
      position: 'absolute',
      left: '10px',
      top: '35%',
      transform: 'translateY(-50%)',
      color: '#999',
    },
    registerButton: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#63b5f4',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    loginLink: {
      fontSize: '0.9rem',
      marginTop: '1.5rem',
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:5000/api/registers', {
        name,
        email,
        password,
      });

      // Log the response for debugging
      console.log('Response:', response);

      // Check for the correct status code for successful registration
      if (response.status === 201) {
        navigate('/home'); // Redirect upon successful registration
      }
    } catch (err) {
      // Log error details for debugging
      console.error('Registration error:', err.response ? err.response.data : err.message);
      
      // Check if a specific error message is returned
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display server-specific error message
      } else {
        setError('An error occurred during registration.'); // Generic error message
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <div style={styles.closeButton}>×</div>
        <h2 style={styles.h2}>Registration</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label>Name</label>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Name"
                style={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span style={styles.icon}>👤</span>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label>Email</label>
            <div style={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Email"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span style={styles.icon}>✉️</span>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
            <div style={styles.inputWrapper}>
              <input
                type="password"
                placeholder="Password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span style={styles.icon}>🔒</span>
            </div>
          </div>

          <button type="submit" style={styles.registerButton} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <div style={styles.loginLink}>
            Already have an account? <Link to="/" style={styles.loginLinkAnchor}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
