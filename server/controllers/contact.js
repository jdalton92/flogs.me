const contactRouter = require("express").Router();
const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

contactRouter.post("/", async (request, response, next) => {
  try {
    const { fullName, email, message } = request.body;
    const date = new Intl.DateTimeFormat("en-GB").format(Date.now());

    if (!fullName || !email || !message) {
      return response.status(400).send({
        error: "Full name, email, and message required"
      });
    }

    const auth = {
      auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN
      }
    };

    const transporter = nodemailer.createTransport(mailGun(auth));

    const mailOptions = {
      from: `"${fullName}" <${email}>`,
      to: process.env.EMAIL,
      subject: "flogs.me: New Message",
      text: `
      Date: ${date}
      Name: ${fullName}
      Email: ${email}
       Message: 
      ${message}
      `
    };

    await transporter.sendMail(mailOptions);

    response.status(200).send({
      message: "Email sent"
    });
  } catch (e) {
    next(e);
  }
});

module.exports = contactRouter;
