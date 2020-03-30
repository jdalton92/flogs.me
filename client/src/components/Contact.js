import React, { useState, useContext } from "react";
import contactService from "../services/contact";
import Context from "../context/Context";
import "../styles/Contact.scss";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const { setNotification } = useContext(Context);

  const formHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactService.sendEmail(form);
      setForm({});
      setLoading(false);
      setNotification({
        type: "success",
        title: "¯\\_(ツ)_/¯",
        message: "email sent"
      });
    } catch (e) {
      console.log(e.response);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "email failed"
      });
      setLoading(false);
    }
  };

  return (
    <section className="contact-section flex-col">
      <div className="flex-col-center form-wrapper">
        {loading ? (
          <div className="loader-spinner">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <input
                onChange={formHandler}
                name="fullName"
                placeholder="name"
                className="form-input"
                type="text"
                maxLength="50"
                required
              />
            </div>
            <div className="form-field">
              <input
                onChange={formHandler}
                placeholder="your@email.com"
                name="email"
                className="form-input"
                type="email"
                maxLength="100"
                required
              />
            </div>
            <div className="form-field message-field">
              <textarea
                onChange={formHandler}
                name="message"
                placeholder="message"
                className="form-input"
                id="form-message"
                input="text"
                maxLength="1250"
                required
              />
            </div>
            <div className="form-button-container">
              <button
                className="form-button"
                id="form-submit"
                type="submit"
                variant="primary"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
