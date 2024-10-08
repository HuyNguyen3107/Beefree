"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "huynm@fullstack.edu.vn",
    pass: "qiju ulut roha njja",
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
    console.log(error);

    // console.error(error);
    return {
      success: false,
      message: "Email sent failed",
    };
  }
};
