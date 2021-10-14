import { UserInputError, ApolloError } from "apollo-server-express";
import nodemailer from "nodemailer";
import mailGun from "nodemailer-mailgun-transport";

export const contact = async (root, { fullName, email, message }) => {
  const date = new Intl.DateTimeFormat("en-GB").format(Date.now());

  if (!fullName || !email || !message) {
    throw new UserInputError("full name, email, and message required");
  }

  const auth = {
    auth: {
      api_key: process.env.API_KEY,
      domain: process.env.DOMAIN,
    },
  };

  try {
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
            `,
    };
    await transporter.sendMail(mailOptions);
    return { fullName, message, email };
  } catch (e) {
    throw new ApolloError(e.message);
  }
};
