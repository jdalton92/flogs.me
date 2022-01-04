import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import Context from "../context/Context";

const DynamicTitle = () => {
  const { blog } = useContext(Context);
  const [title, setTitle] = useState("flogs.me");
  const { pathname } = useLocation();
  useEffect(() => {
    const blogTitle = blog?.getBlog?.title;
    setTitle(
      `flogs.me${
        blogTitle && pathname.includes("/blog/") ? ` | ${blogTitle}` : ""
      }`
    );
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default DynamicTitle;
