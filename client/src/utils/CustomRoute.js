import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Context from "../context/Context";

const CustomRoute = (props) => {
  const { meError, meLoading, meData } = useContext(Context);
  if (!meError && !meLoading && meData.getMe !== null) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};

export default CustomRoute;
