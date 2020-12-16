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
        console.log(token)
        if (!token) {
            console.log('here')
            res.status(401).json({ msg: "No authentication token" });
        } 
        const verified = verifyToken(token);
        console.log("verified");
        console.log(verified);
        if (verified) {        
            const user = await User.findById(verified.id);
            console.log(user)
           if (user) {
            req.user = user.username;
            next();
           }            
        }
        res.status(401).json({ msg: "Token verification failed" });
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message });
    }
}



module.exports = auth;