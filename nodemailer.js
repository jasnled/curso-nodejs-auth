const { config } = require('./config/config');
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",// el servidor que se utilizara es el de gmail el cual si es seguro
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: config.userMailer, // generated ethereal user
      pass: config.passMailer // password generado por el google
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: config.userMailer, //sender address
    to: config.userMailer, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello, putite vegane", // plain text body
    html: "<b>Hello, putite vegane</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail();
