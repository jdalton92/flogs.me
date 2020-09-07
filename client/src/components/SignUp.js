import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { SUBSCRIBE } from "../queries/subscribeQueries";
import Context from "../context/Context";
import "../styles/SignUp.css";

const SignUp = ({ type }) => {
  const [form, setForm] = useState({});
  const { setNotification } = useContext(Context);
  const [subscribe, { loading: subscribeLoading }] = useMutation(SUBSCRIBE);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await subscribe({ variables: form });
      setNotification({
        type: "success",
        title: "ヽ(ヅ)ノ",
        message: "subscribed"
      });
    } catch (e) {
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
    <div className={`subscribe-box subscribe-box-${type}`}>
      <div className={`subscribe-header subscribe-header-${type}`}>
        subscribe to be notified of updates
      </div>
      <form
        onSubmit={handleSubmit}
        className={`flex-col-center subscribe-form subscribe-form-${type}`}
      >
        {subscribeLoading ? (
          <div className="loader-spinner">loading...</div>
        ) : (
          <>
            <input
              className="subscribe-form-input box-shadow-3"
              name="email"
              placeholder="your@email.com"
              type="email"
              maxLength="255"
              onChange={formHandler}
              required
            />
            <button className="subscribe-form-btn primary-btn box-shadow-3" type="submit">
              subscribe
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignUp;
