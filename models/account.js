// Imports
const mongoose = require('mongoose');
const validator = require('validator');

// Account Schema
const accountsSchema = new mongoose.Schema({
    network: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    }, 
    password: {
        type: String,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Making a model
const Projects = mongoose.model('Accounts', accountsSchema);

// Export the model
module.exports = Projects;