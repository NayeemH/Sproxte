const mongoose = require('mongoose');
const {isEmail} = require('validator');

const sessionSchema = mongoose.Schema({
    sessionId: {
        type: String,
        default: 0
    },
    refreshToken: {
        type: String
    }
});



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a username'],
        trim: true,
        minlength: [2, 'Minimum username length is 2 characters'],
        maxlength: [30, 'Maximum username length is 30 characters']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: [isEmail, 'Please enter valid email'],
        maxlength: [254, 'Maximum email length is 254 characters']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
        maxlength: [127, 'Maximum password length is 100 characters']
    },
    userType: {
        type: String,
        default: 'client'
    },
    image: {
        type: String,
        default: 'default.png',
    },
    address: {
        type: String
    },
    verified: {
        type: String,
        default: false
    },
    sessions: {
        type: [sessionSchema]
    },
    orderHistory: {
        type: Array,
        default: []
    },
    saveDesign: {
        type: Array,
        default: []
    }
});


// Creating a model
const User = mongoose.model('user', userSchema);


module.exports = User;