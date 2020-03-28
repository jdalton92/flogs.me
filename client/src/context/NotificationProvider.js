import React, { useState } from "react";
import NotificationContext from "./NotificationContext";
import { v4 as uuid } from "uuid";

const NotificationProvider = ({ children }) => {
  const [notifications, setMessage] = useState([]);

  const setNotification = data =>
    setMessage([...notifications, { ...data, id: uuid() }]);
  const removeNotification = id => {
    const newNotifications = notifications.filter(n => n.id !== id);
    setMessage(newNotifications);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
