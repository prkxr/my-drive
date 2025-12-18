const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const fileModel = require('../models/file.model');
const authMiddleware = require('../middleware/auth'); // Import the new auth middleware
const supabase = require('../config/supabase.config');

// 1. Protect the home route so only logged-in users can see it
router.get('/home', authMiddleware, async (req, res) => {
    // Fetch files that belong to the current logged-in user
    const userFiles = await fileModel.find({ 
        user: req.user.userId 
    });

    res.render('home', {
        files: userFiles, // Send files to the frontend
        supabaseUrl: process.env.SUPABASE_URL
    });
});

// 2. Handle the file upload
router.post('/upload-file', authMiddleware, upload.single('file'), async (req, res) => {
    // 'file' matches the name attribute in your HTML form <input name="file">
    
    const file = req.file; 
    
    // Upload file to Supabase
    // We create a unique path: uploads/userId/timestamp-filename
    const filePath = `uploads/${req.user.userId}/${Date.now()}-${file.originalname}`;

    const { data, error } = await supabase.storage
        .from('uploads') // Matches the bucket name you created
        .upload(filePath, file.buffer, {
            contentType: file.mimetype
        });

    if (error) {
        return res.status(500).send(error.message);
    }

    // Save file metadata to MongoDB
    await fileModel.create({
        path: filePath,
        originalname: file.originalname,
        user: req.user.userId
    });

    res.redirect('/home');
});

module.exports = router;