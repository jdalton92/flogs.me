import React, { useContext, useState } from "react";
import NotificationContext from "../context/NotificationContext";

const NotificationAlert = ({ notification }) => {
  const [animate, setAnimate] = useState(false);
  const { removeNotification } = useContext(NotificationContext);

  const handleClose = e => {
    e.preventDefault();
    setAnimate(true);
    setTimeout(() => removeNotification(notification.id), 250);
  };

  const { title, message, type } = notification;
  return (
    <div
      className={`flex-col-center p10 notification-alert-wrapper ${
        animate ? "notification-alert-close" : ""
      }`}
    >
      <div className="flex-row w100 notification-subheader-wrapper">
        <div className={`notification-${type} flex-7 notification-subheader`}>
          {title}
        </div>
        <div
          className="flex-1 flex-row notification-close"
          onClick={handleClose}
        >
          x
        </div>
      </div>
      <div className="w100 notification-message">{message}</div>
    </div>
  );
};

export default NotificationAlert;
