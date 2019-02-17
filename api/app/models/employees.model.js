const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    active: { type: Boolean },
    department: { type: String },
    position: { type: String },
    skills: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);