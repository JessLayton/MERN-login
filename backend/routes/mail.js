const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { v4: uuidv4 } = require('uuid');

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

let uuid = uuidv4(); 

  const mailOptions = (email) => ({
    from: process.env.NODEMAILER_USER,
    to: email,        
    subject: 'Reset login details', 
    text: 'Reset your email',
    html: 
        `<body>
            <p>Hello </p>
            <a href=http://localhost:3000/passwordReset/${uuid}>Click here to reset password</a>
        </body>`    
});

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