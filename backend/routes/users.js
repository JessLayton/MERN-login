const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/user-model');

router.post('/register', async (req, res) => {
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
        const savedUser = await newUser.save();
        return res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Fields cannot be empty." });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
             return res
                .status(400)
                .json({ msg: "No account with this email has been registered." });
        }           
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials." });
            }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 30 });
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

router.get('/tokenIsValid', auth, async (req, res) => {
    try {       
       return res.status(200).json({ user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;