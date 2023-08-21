const nodemailer = require('nodemailer');

const sendEmail = async options => {
//Steps to send emails with nodeMailer:
    // 1- Create transporter(service to send email)
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 25,
      auth: {
        user: "8dc4aaee2aed46",
        pass: "72c3388187ba63",
      },
    });

    // 2- Define email options
    const mailOptions = {
        from: 'Alaa Hamdy Mohammadi <alaa@info.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    // 3- Actually send the email 
    await transporter.sendMail(mailOptions) //Return Promise
};

module.exports = sendEmail;