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

  const mailOptions = (email, username, uuid) => ({
    from: process.env.NODEMAILER_USER,
    to: email,        
    subject: 'Reset login details', 
    text: `Hello ${username}. \nYou can reset your email by pasting this link into your browser: http://localhost:3000/passwordReset/${uuid}`,
    html: 
        `<body>
            <h2>Hello ${username}!</h2>
            <p> A password reset has been requested for ${email}</p>
            <p> Ignore this email if you did not request this<p/>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td>
                    <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                        <td bgcolor="blue" style="padding: 12px 18px 12px 18px; border-radius:3px" align="center"><a href=http://localhost:3000/passwordReset/${uuid}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none; display: inline-block;">Reset Password</a></td>
                        </tr>
                    </table>
                    </td>
                </tr>
                </table>          
        </body>`    
});

const sendResetEmail = (email, username, uuid) => {
    try {
        transport.sendMail(mailOptions(email, username, uuid));
    } catch (err) {
        console.error("FAILED TO SEND EMAIL", err)
    }
}   

module.exports = sendResetEmail;