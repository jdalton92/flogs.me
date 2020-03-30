import axios from "axios";
const baseUrl = "/api/contact";

const sendEmail = async email => {
  const res = await axios.post(baseUrl, email);
  return res.data;
};

export default { sendEmail };
