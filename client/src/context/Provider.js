import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../queries/userQueries";
import Context from "./Context";
import { v4 as uuid } from "uuid";

const Provider = ({ children }) => {
  const {
    loading: meLoading,
    error: meError,
    data: meData,
    refetch: meRefetch
  } = useQuery(ME);

  const [notifications, setMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [loginView, setLoginView] = useState("landing");

  const setNotification = ({ type, title, message }) =>
    setMessage([
      ...notifications,
      {
        type,
        title,
        message: message.replace("GraphQL error: ", ""),
        id: uuid()
      }
    ]);

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
        meData,
        meRefetch
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
