import React, { useContext, useState } from "react";
import Context from "../context/Context";

const NotificationAlert = ({ notification }) => {
  const [animate, setAnimate] = useState(false);
  const { removeNotification } = useContext(Context);

  const handleClose = (e) => {
    e.preventDefault();
    setAnimate(true);
    setTimeout(() => removeNotification(notification.id), 250);
  };

  const { title, message, type } = notification;
  return (
    <div
      className={`flex-col-center p10 box-shadow-hover notification-alert-wrapper ${
        animate ? "notification-alert-close" : ""
      }`}
    >
      <div className="flex-row w100 notification-subheader-wrapper">
        <div className={`notification-${type} flex-7 notification-subheader`}>
          {title}
        </div>
        <div className="flex-1 flex-row notification-close-wrapper">
          <div
            onClick={handleClose}
            className="flex-row-center notification-close"
          >
            x
          </div>
        </div>
      </div>
      <div className="w100 notification-message">{message}</div>
    </div>
  );
};

export default NotificationAlert;
