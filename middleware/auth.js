const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('Unauthorized: Please login first');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adds user data (userId, email, etc) to the request
        next();
    } catch (err) {
        return res.status(401).send('Unauthorized: Invalid token');
    }
}

module.exports = auth;