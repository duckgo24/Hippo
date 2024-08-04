const nodemailer = require('nodemailer');

module.exports = function sendMail(req,res) {
    const { content, toEmail } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vcb.031024@gmail.com',
            pass: 'Vietcb123'
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