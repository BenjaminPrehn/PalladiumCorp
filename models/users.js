// Imports
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const Accounts = require('./account');
require('dotenv').config();

// User Schema
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('The email is invalid - Please insert a real email.')
            }
        }
    }, 
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, 
{
timestamps: true
});

// Adding a one to many connection to accounts
userSchema.virtual('accounts', {
    ref: 'Accounts',
    localField: '_id',
    foreignField: 'owner'
})

// METHODS
// When creating and getting a user, remove pass and token from json string which is returned
userSchema.methods.toJSON = function () {
    const user = this; 
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// Generate a Token for each user session and save to mongoDB
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.TOKEN_SECRET);

    user.tokens = user.tokens.concat({ token: token});
    await user.save();

    return token;
}

// PRE - Kind of middelware
// Hash the password with Bcrypt before saving to the DB 
userSchema.pre("save", async function (next) {
    const user = this; 

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    };

    next();
});

// STATICS
// Find user by email and use Bcrypt to compare password to see if it match
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email});

    if (!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error("Unable to login - Password or username is wrong");
    }

    return user;
};

// Create model
const User = mongoose.model("User", userSchema); 

// Export model
module.exports = User; 