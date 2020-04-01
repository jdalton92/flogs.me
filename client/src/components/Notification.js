import React, { useContext } from "react";
import Context from "../context/Context";
import NotificationAlert from "./Notification.Alert";
import "../styles/Notification.css";

const Notification = () => {
  const { notifications } = useContext(Context);

  return (
    <div className="flex-col notification-wrapper m10">
      {notifications.length > 0
        ? notifications.map((n, i) => (
            <NotificationAlert key={i} notification={n} />
          ))
        : null}
    </div>
  );
};

export default Notification;
