const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    active: { type: Boolean, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    skills: { type: Array, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);