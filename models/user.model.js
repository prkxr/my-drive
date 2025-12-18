const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [5, 'Username must be atleast 5 characters long']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, 'password must be atleast 8 characters long']
    }
})

const user = mongoose.model('user',userSchema)

module.exports = user;