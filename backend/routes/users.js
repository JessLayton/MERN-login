const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const sendMail = require('./mail');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport'); // this is important
const User = require('../models/user-model');

router.post('/register', async (req, res) => {
    try {
        let { email, password, confirmPassword, username } = req.body;
        if (!email || !username || !password || !confirmPassword) {
            res.status(400).json({ msg: "Fields cannot be empty." });
        } if (password.length < 8) {
            res.status(400).json({ msg: "The password needs to be at least 8 characters long." });
        } if (password !== confirmPassword) {
            res.status(400).json({ msg: "Passwords do not match." });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.status(400).json({ msg: "An account with this email already exists." });
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: passwordHash,
            username,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: 60 * 30 });
        res.json({
            token,
            user: { email: savedUser.email, username: savedUser.user, id: savedUser._id  },
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ msg: "Fields cannot be empty." });
        }
        const user = await User.findOne({ username: username });
        if (!user) {
             return res
                .status(400)
                .json({ msg: "No account with this username has been registered." });
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

router.post('/reset', async (req, res) => {
    try {
        const { email } = req.body;
        console.log("body", req.body);
        if (!email) {
            return res.status(400).json({ msg: "Fields cannot be empty." });
        }
        const emailExists = await User.findOne({ email: email });
        if (emailExists) {
            console.log("HIT")
            sendMail(email);
            return res.status(200).json({ email: "email sent" });

        } else {
            return res
            .status(400)
            .json({ msg: "No account with this email has been registered." });
        }
        
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;