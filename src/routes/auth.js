const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User'); // Ensure the path to your User model is correct
const app = express();

app.use(express.json()); // To parse JSON bodies

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        console.log('Received registration data:', { name, email, password }); // Log received data

        // Create a new user
        const newUser = new User({ name, email, password });

        // Save the user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during registration:', error); // Log error details
        res.status(500).json({ message: 'An error occurred during registration.', error: error.message });
    }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/grievances', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => app.listen(5000, () => console.log('Server is running on http://localhost:5000')))
.catch(err => console.error('Could not connect to MongoDB:', err));
