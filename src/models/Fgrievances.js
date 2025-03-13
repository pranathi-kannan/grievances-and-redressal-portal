const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
    email: String,
    to: String,
    subject: String,
    issue: String,
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' },
    reply: { type: String, default: '' }
});

module.exports = mongoose.model('Grievance', grievanceSchema);
