const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

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

  const mailOptions = (email, uuid) => ({
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

const sendMail = (email, uuid) => {
    try {
        console.log('sending email..');
        transport.sendMail(mailOptions(email, uuid));
        console.log('EMAIL SENT..');
    } catch (err) {
        console.error("FAILED TO SEND")
    }
}   

module.exports = sendMail;