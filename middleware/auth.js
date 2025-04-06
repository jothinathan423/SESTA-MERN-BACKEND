const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Format: Bearer <token>
        if (!token) {
            return res.status(401).json({ message: "Auth failed: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // You can now access `req.user` in protected routes
        next();
    } catch (err) {
        res.status(401).json({ message: "Auth failed: Invalid token" });
    }
};

module.exports = auth;
