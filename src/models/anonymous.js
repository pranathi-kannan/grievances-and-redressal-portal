const mongoose = require('mongoose');

const anonymousGrievanceSchema = new mongoose.Schema({
    to: { type: String, required: true },
    subject: { type: String, required: true },
    issue: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const anonymous = mongoose.model('anonymous', anonymousGrievanceSchema);

module.exports = anonymous;
