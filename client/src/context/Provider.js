import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../queries/userQueries";
import Context from "./Context";
import { v4 as uuid } from "uuid";

const Provider = ({ children }) => {
  const { loading: meLoading, error: meError, data: meData } = useQuery(ME);
  const [notifications, setMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [loginView, setLoginView] = useState("landing");

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
        setOpen,
        token,
        setToken,
        dropdown,
        setDropdown,
        loginView,
        setLoginView,
        meLoading,
        meError,
        meData
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
