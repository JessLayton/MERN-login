const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/user-model');

router.post('/register', async (req, res) => {
    console.log("HIT REG1")
    try {
        let { email, password, confirmPassword, username } = req.body;
        if (!email || !username || !password || !confirmPassword)
            return res.status(400).json({ msg: "Fields cannot be empty." });
        if (password.length < 8)
            return res.status(400)
                .json({ msg: "The password needs to be at least 8 characters long." });

        if (password !== confirmPassword)
            return res
                .status(400)
                .json({ msg: "Passwords do not match." });
        const existingUser = await User.findOne({ email: email });
        if (existingUser)
            return res
                .status(400)
                .json({ msg: "An account with this email already exists." });

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: passwordHash,
            username,
        });
        console.log("newUser", newUser);
        const savedUser = await newUser.save();
        return res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("loginDataaa!", email, password)
        if (!email || !password) {
            return res.status(400).json({ msg: "Fields cannot be empty." });
        }
        const user = await User.findOne({ email: email });
        console.log("user", user);
        if (!user) {
             return res
                .status(400)
                .json({ msg: "No account with this email has been registered." });
        }           
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("ISMATCH", isMatch);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials." });
            }
        console.log("Before token")
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 30 });
        console.log("token", token)
        return res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/delete', auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            res.status(401);
            console.log("no token");
            return res.json(false);
        }
        console.log("Before")
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            res.status(401);
            console.log("unverified token")
            return res.json(false);
        }
        const user = await User.findById(verified.id);
        if (!user) {
            res.status(404);
            return res.json(false);
        } else {
            return res.json(true);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);
    return res.json({
        username: user.username,
        id: user._id,
    });
});
module.exports = router;