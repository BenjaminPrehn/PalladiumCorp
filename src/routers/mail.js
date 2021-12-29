const express = require('express');
const nodemailer = require('nodemailer');
const router = new express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

let transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  router.post("/mail/send", (req, res) => {

    let mailOptions = {
      from: `"PalladiumCorp" benjibob96@gmail.com`,
      to: req.body.email,
      subject: "Account info",
      text: `
      You have probably requested a login, please find it below:
      Network: ${req.body.network}
      Username: ${req.body.username}
      Password: ${req.body.password}
      `
    };
  
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId)
  
    });
  
    setTimeout(() => {
      res.redirect("/");
    }, 1000);
  
  });

  module.exports = router;