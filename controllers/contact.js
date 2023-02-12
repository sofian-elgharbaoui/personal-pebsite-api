const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400).json({ msg: "You must fill all fields" });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS,
    subject: subject,
    text: `From: ${name} (${email})\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).json({
        err,
        msg: "Unable to send email",
      });
      return;
    }
    res.status(202).send("Email has been sent successfully");
  });
};

module.exports = sendEmail;
