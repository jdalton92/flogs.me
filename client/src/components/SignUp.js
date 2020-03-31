import React, { useState, useContext } from "react";
import Context from "../context/Context";
import subscribeService from "../services/subscription";

const SignUp = () => {
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
    <div className="subscribe-box">
      <div className="subscribe-header">
        subscribe to be notified of updates
      </div>
      <form onSubmit={handleSubmit} className="flex-col-center subscribe-form">
        {fetching ? (
          <div className="loader-spinner">loading...</div>
        ) : (
          <>
            <input
              name="email"
              placeholder="your@email.com"
              type="email"
              maxLength="255"
              onChange={formHandler}
              required
            />
            <button type="submit" className="subscribe-button">
              submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignUp;
