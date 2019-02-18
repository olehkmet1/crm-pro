const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    password: String,
    avatar: String,
    admin: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);