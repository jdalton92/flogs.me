import React, { useState, useContext } from "react";
import NotificationContext from "../context/NotificationContext";
import subscribeService from "../services/subscription";
import "../styles/Home.css";

const Home = () => {
  const [form, setForm] = useState({});
  const [fetching, setFetching] = useState();
  const { setNotification } = useContext(NotificationContext);

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
    <section className="home-section">
      <div className="flex-col-center">
        <div className="loader-wrapper">
          <div className="loader-col">Loading...</div>
        </div>
        <div className="flex-row-center body-message">
          coming soon you fucks.
        </div>
        <div className="subscribe-box">
          <div className="subscribe-header">
            subscribe to be notified of updates
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-col-center subscribe-form"
          >
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
      </div>
    </section>
  );
};

export default Home;
