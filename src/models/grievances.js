const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
    email: { type: String, required: true },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    issue: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Grievance = mongoose.model('grievances', grievanceSchema);

module.exports = Grievance;
