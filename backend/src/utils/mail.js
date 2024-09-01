"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "levi2k3ds@gmail.com",
    pass: "mrwm ckbf yfii cqls",
  },
});

module.exports = async (to, subject, message) => {
  const info = await transporter.sendMail({
    from: `"Beefree 🤡" <levi2k3ds@gmail.com>`, // sender address
    to, // list of receivers
    subject: subject, // Subject line
    html: `
    ${message}
    `, // html body
  });
  return info;
};
