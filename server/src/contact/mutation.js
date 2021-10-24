import apollo from "apollo-server-express";
const { UserInputError, ApolloError } = apollo;
import nodemailer from "nodemailer";
import mailGun from "nodemailer-mailgun-transport";

const contact = async (root, { fullName, email, message }) => {
  const date = new Intl.DateTimeFormat("en-GB").format(Date.now());

  if (!fullName || !email || !message) {
    throw new UserInputError("full name, email, and message required");
  }

  const auth = {
    auth: {
      api_key: config.API_KEY,
      domain: config.DOMAIN,
    },
  };

  try {
    const transporter = nodemailer.createTransport(mailGun(auth));
    const mailOptions = {
      from: `"${fullName}" <${email}>`,
      to: config.EMAIL,
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

export default { contact };
