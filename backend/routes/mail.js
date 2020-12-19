const router = require('express').Router();
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport'); // this is important

let transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com', 
    secure: false,
    port: 587,
    requireTLS: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    } 
  }));

  const mailOptions = (email) => ({
    from: process.env.NODEMAILER_USER,
    to: email,        
    subject: 'Reset login details', 
    text: 'Reset your email',
    html: 
        `<body>
            <p>Hello </p>
            <a href=http://localhost:3000/resetPassword/$>Click here to reset password</a>
        </body>`    
});

// router.get('/sendResetMail', async (req, res) => {
const sendMail = (email) => {
    try {
        console.log('sending email..');
        transport.sendMail(mailOptions(email));
        console.log('EMAIL SENT..');
    } catch (err) {
        console.error("FAILED TO SEND")
    }
}   

module.exports = sendMail;