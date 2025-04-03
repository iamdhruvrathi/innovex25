const nodemailer = require("nodemailer");
require("dotenv").config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gsumanth3005@gmail.com",
    pass: process.env.APP_PW, // Use the app password here
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

const mailOptions = {
  from: "gsumanth3005@gmail.com",
  to: "dhruv2005rathi@gmail.com",
  subject: "Test Email",
  text: "Hello! This is a test email sent using Nodemailer and Gmail SMTP.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent successfully:", info.response);
  }
});
