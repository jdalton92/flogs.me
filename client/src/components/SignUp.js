import React, { useState, useContext } from "react";
import Context from "../context/Context";
import subscribeService from "../services/subscription";
import "../styles/SignUp.css";

const SignUp = ({ type }) => {
  const [form, setForm] = useState({});
  const [fetching, setFetching] = useState();
  const { setNotification } = useContext(Context);

  const handleSubmit = async e => {
    e.preventDefault();
    setFetching(true);
    try {
      await subscribeService.subscribe(form);
      setNotification({
        type: "success",
        title: "ヽ(ヅ)ノ",
        message: "subscribed"
      });
      setFetching(false);
    } catch (e) {
      setFetching(false);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "subscription failed"
      });
    }
  };

  const formHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div id="subscribe-box" className={`subscribe-box-${type}`}>
      <div id="subscribe-header" className={`subscribe-header-${type}`}>
        subscribe to be notified of updates
      </div>
      <form
        id="subscribe-form"
        onSubmit={handleSubmit}
        className={`flex-col-center subscribe-form-${type}`}
      >
        {fetching ? (
          <div className="loader-spinner">loading...</div>
        ) : (
          <>
            <input
              id="subscribe-form-input"
              name="email"
              placeholder="your@email.com"
              type="email"
              maxLength="255"
              onChange={formHandler}
              required
            />
            <button
              id="subscribe-form-btn"
              className="primary-btn"
              type="submit"
            >
              subscribe
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignUp;
