const nodemailer = require('nodemailer');

const sendEmail = options => {
//Steps to send emails with nodeMailer:
    // 1- Create transporter(service to send email)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email',
            pass: 'your-password',
        }
    })

    // 2- Define email options

    // 3- Actually send the email 
}