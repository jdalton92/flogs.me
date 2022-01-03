import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ME } from "../queries/userQueries";
import { GET_BLOGS, SEARCH_BLOGS } from "../queries/blogQueries";
import Context from "./Context";
import { v4 as uuid } from "uuid";

const Provider = ({ children }) => {
  // User login info
  const {
    loading: meLoading,
    error: meError,
    data: meData,
    refetch: meRefetch,
  } = useQuery(GET_ME);

  // Blogs data and search query
  const [
    searchBlogs,
    {
      data: searchBlogsData,
      error: searchBlogsError,
      loading: searchBlogsLoading,
    },
  ] = useLazyQuery(SEARCH_BLOGS);
  // Paginated blogs
  const [
    getBlogs,
    { data: getBlogsData, error: getBlogsError, loading: getBlogsLoading },
  ] = useLazyQuery(GET_BLOGS);

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

  // Edit blog modal in "Blog Admin" view
  const [showEditBlogModal, setShowEditBlogModal] = useState(false);

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
        searchBlogs,
        searchBlogsData,
        searchBlogsError,
        searchBlogsLoading,
        getBlogs,
        getBlogsData,
        getBlogsError,
        getBlogsLoading,
        showEditBlogModal,
        setShowEditBlogModal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
