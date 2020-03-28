import React, { useState } from "react";
import Context from "./Context";
import { v4 as uuid } from "uuid";

const Provider = ({ children }) => {
  const [notifications, setMessage] = useState([]);
  const [open, setOpen] = useState(false);

  const setNotification = data =>
    setMessage([...notifications, { ...data, id: uuid() }]);

  const removeNotification = id => {
    const newNotifications = notifications.filter(n => n.id !== id);
    setMessage(newNotifications);
  };

  return (
    <Context.Provider
      value={{
        notifications,
        setNotification,
        removeNotification,
        open,
        setOpen
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
