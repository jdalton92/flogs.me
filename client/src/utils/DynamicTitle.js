import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

const DynamicTitle = () => {
  const [url, setUrl] = useState("");
  const history = useHistory();

  const pathname = history.location.pathname;

  useEffect(() => {
    setUrl(pathname);
  }, [pathname]);

  //Revert to default title unless on blog view
  //Assigning dynamic title done in Blog.js component
  if (url.toLowerCase().includes("/blog/")) {
    return null;
  } else {
    return (
      <Helmet>
        <title>flogs.me</title>
      </Helmet>
    );
  }
};

export default DynamicTitle;
