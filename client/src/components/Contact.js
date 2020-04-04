import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { CONTACT } from "../queries/contactQueries";
import Context from "../context/Context";
import "../styles/Contact.scss";

const Contact = () => {
  const [variables, setVariables] = useState({});
  const { setNotification } = useContext(Context);
  const [contact, { loading: contactLoading }] = useMutation(CONTACT);

  const formHandler = e => {
    setVariables({ ...variables, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await contact({ variables });
      setVariables({});
      setNotification({
        type: "success",
        title: "ヽ(•‿•)ノ",
        message: "email sent"
      });
    } catch (e) {
      console.log(e);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "email failed"
      });
    }
  };

  return (
    <section className="contact-section flex-col">
      <div className="flex-col-center form-wrapper">
        {contactLoading ? (
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
                className="primary-btn form-button"
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
