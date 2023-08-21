const nodemailer = require("nodemailer");

//const sendEmail = async (options) => {
  //Steps to send emails with nodeMailer:
  // 1- Create transporter(service to send email)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "alaa.hamdy.mohammadi@gmail.com",
      pass: "72c3388187ba63",
    },
  });

  // 2- Define email options
  const mailOptions = {
    from: "alaa.hamdy.mohammadi@gmail.com",
    to: "alaahamdy2197@gmail.com",
    subject: "Sending email with node.js",
    text: "this's simple",
  };

  // 3- Actually send the email
  transporter.sendMail(mailOptions, (err, data) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`Sent: ${info.response}`)
  }); //Return Promise
// };


