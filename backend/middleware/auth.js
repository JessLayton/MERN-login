const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        return verified;
    } catch (err) {
        console.error(err);
        return false;
    }
}

const auth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            res.status(401).json({ msg: "No authentication token" });
        } 
        const verified = verifyToken(token);
        if (verified) {        
            const user = await User.findById(verified.id);
           if (user) {
            req.user = user.username;
            req.role = user.role;
            return next();
           }            
        }
        res.status(401).json({ msg: "Token verification failed" });
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message });
    }
}

module.exports = auth;