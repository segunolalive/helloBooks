const nodemailer = require('nodemailer');
require('dotenv').config();

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const mailOptions = (to, bcc, subject, html) => ({
  from: '"noreply: Hello Books" <zeusdynamic@gmail.com>',
  to,
  bcc,
  subject,
  html,
});
