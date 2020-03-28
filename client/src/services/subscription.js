import axios from "axios";
const baseUrl = "/api/subscriptions";

const subscribe = async email => {
  const res = await axios.post(baseUrl, email);
  return res.data;
};

export default { subscribe };
