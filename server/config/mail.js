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

/**
 * helper function for generating mail options for nodemailer
 * @param  {string} to
 * @param  {string} bcc
 * @param  {string} subject
 * @param  {string} html
 * @return {object}         mail options
 */
export const mailOptions = (to, bcc, subject, html) => ({
  from: '"noreply: Hello Books" <zeusdynamic@gmail.com>',
  to,
  bcc,
  subject,
  html,
});
