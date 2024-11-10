"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.NODE_MAILER_HOST,
  port: process.env.NODE_MAILER_PORT,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = async (to, subject, message) => {
  try {
    const info = await transporter.sendMail({
      from: `"Beefree 🤡" <huynm@fullstack.edu.vn>`, // sender address
      to, // list of receivers
      subject: subject, // Subject line
      html: `
      ${message}
      `, // html body
    });
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Email sent failed",
    };
  }
};
