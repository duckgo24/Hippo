const nodemailer = require('nodemailer');

require('dotenv').config();

module.exports = function sendMail(toEmail, content) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SEND,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: '"Hippo 👻" <vcb.031024@gmail.com>',
        to: toEmail,
        subject: 'Reset password',
        text: content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
}