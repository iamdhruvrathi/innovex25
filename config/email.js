const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gsumanth3005@gmail.com", // Your email from .env
    pass: process.env.APP_PW, // App password from .env
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * Send an email using Nodemailer
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 */
async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: "gsumanth3005@gmail.com",
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;
