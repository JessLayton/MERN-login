const isAdmin = async (req, res, next) => {
    try {
        if (req.role === "admin") {
            next();
        } else {
            res.status(403).json({ msg: "Unauthorized" });
        }
    } catch (err) {
    console.error(err); 
    }    
}

module.exports = isAdmin;


    