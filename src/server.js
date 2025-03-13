const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User'); // User model
const Grievance = require('./models/grievances'); 
const anonymous = require('./models/anonymous');// Grievance model
const bcrypt = require('bcrypt'); // For password hashing

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/grievances')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Registration endpoint
app.post('/api/registers', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'An error occurred during registration.' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password); // Ensure password is hashed in DB
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // If login is successful, send back the user data or token
        res.status(200).json({ user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login.' });
    }
});

// Grievance submission endpoint
app.post('/api/grievances', async (req, res) => {
    try {
        const { email, to, subject, issue } = req.body;

        if (!email || !to || !subject || !issue) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newGrievance = new Grievance({ email, to, subject, issue });

        await newGrievance.save();

        res.status(201).json({ message: 'Grievance submitted successfully' });
    } catch (error) {
        console.error('Error saving grievance:', error);
        res.status(500).json({ message: 'An error occurred while saving the grievance.' });
    }
});

// recent
app.get('/api/grievances', async (req, res) => {
    try {
        const grievances = await Grievance.find().sort({ createdAt: -1 }); // Sort grievances by latest
        res.json(grievances); // Send grievances to the client
    } catch (error) {
        console.error('Error fetching grievances:', error);
        res.status(500).json({ message: 'Error fetching grievances' });
    }
});
// Anonymous Grievance submission endpoint
app.post('/api/anonymous', async (req, res) => {
    try {
        const { to, subject, issue } = req.body;

        if (!to || !subject || !issue) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newGrievance = new anonymous({
            to,
            subject,
            issue,
        });

        await newGrievance.save();

        res.status(201).json({ message: 'Anonymous grievance submitted successfully' });
    } catch (error) {
        console.error('Error saving anonymous grievance:', error);
        res.status(500).json({ message: 'An error occurred while saving the anonymous grievance.' });
    }
});

// Get grievance details by ID
// Example API route in Express
// Get grievance details by ID
app.get('/api/grievances/:id', async (req, res) => {
    const grievanceId = req.params.id;

    // Check if grievanceId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(grievanceId)) {
        return res.status(400).json({ message: 'Invalid grievance ID format' });
    }

    try {
        const grievance = await Grievance.findById(grievanceId);
        if (!grievance) {
            return res.status(404).json({ message: 'Grievance not found' });
        }
        res.json(grievance);
    } catch (error) {
        console.error('Error fetching grievance:', error);
        res.status(500).json({ message: 'Server error while fetching grievance' });
    }
});




  
  // Update grievance response and status
// Update grievance reply and status
app.put('/api/grievances/:id/reply', async (req, res) => {
    try {
        const { response, status } = req.body;

        // Validate request body
        if (!response || !status) {
            return res.status(400).json({ message: 'Response and status are required' });
        }

        const grievance = await Grievance.findById(req.params.id);
        if (!grievance) return res.status(404).json({ message: 'Grievance not found' });

        // Update grievance details
        grievance.response = response;
        grievance.status = status;
        await grievance.save();

        res.json(grievance);
    } catch (error) {
        console.error('Error updating grievance:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

  

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
