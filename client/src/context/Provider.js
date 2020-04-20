import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ME } from "../queries/userQueries";
import { ALL_BLOGS } from "../queries/blogQueries";
import Context from "./Context";
import { v4 as uuid } from "uuid";

const Provider = ({ children }) => {
  //User login info
  const {
    loading: meLoading,
    error: meError,
    data: meData,
    refetch: meRefetch,
  } = useQuery(ME);

  //Blogs data and search query
  const [
    blogsSearch,
    { data: blogsData, error: blogsError, loading: blogsLoading },
  ] = useLazyQuery(ALL_BLOGS);

  // Notifications state
  const [notifications, setMessage] = useState([]);
  const setNotification = ({ type, title, message }) =>
    setMessage([
      ...notifications,
      {
        type,
        title,
        message: message.replace("GraphQL error: ", ""),
        id: uuid(),
      },
    ]);

  const removeNotification = (id) => {
    const newNotifications = notifications.filter((n) => n.id !== id);
    setMessage(newNotifications);
  };

  // Mobile menu state
  const [open, setOpen] = useState(false);

  // User dropdown menu state
  const [dropdown, setDropdown] = useState(false);

  // Landing page view state
  const [loginView, setLoginView] = useState("landing");

  return (
    <Context.Provider
      value={{
        notifications,
        setNotification,
        removeNotification,
        open,
        setOpen,
        dropdown,
        setDropdown,
        loginView,
        setLoginView,
        meLoading,
        meError,
        meData,
        meRefetch,
        blogsSearch,
        blogsData,
        blogsError,
        blogsLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
