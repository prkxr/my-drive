const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, 'Path is required']
    },
    originalname: {
        type: String,
        required: [true, 'Original name is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Must match the model name in your user.model.js
        required: [true, 'User is required']
    }
});

const File = mongoose.model('file', fileSchema);

module.exports = File;