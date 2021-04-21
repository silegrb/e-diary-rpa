const jwt = require('jsonwebtoken');
const config = require('../config');

const { JWT_SECRET } = config;

module.exports = (roles) => (req, res, next) => {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) { return res.status(401).json({message:'Missing credentials'}); }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Verify role
        const { role } = jwt.decode(token);

        if (roles != null && !roles.includes(role)) { return res.status(403).json({message:'Missing roles'}); }

        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400);
    }
};