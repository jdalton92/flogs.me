import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../queries/userQueries";
import Context from "../../context/Context";

const NavLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { meRefetch, setLoginView, setNotification } = useContext(Context);
  const [login, { loading: loginLoading }] = useMutation(LOGIN);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });
      localStorage.setItem("flogsToken", data.login.value);
      meRefetch();
      setLoginView("landing");
    } catch (e) {
      console.log(e);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
      setEmail("");
      setPassword("");
    }
  };

  if (loginLoading) {
    return <div className="loader-spinner loading-wrapper">loading...</div>;
  }

  return (
    <form className="nav-login-form" onSubmit={handleLogin}>
      <input
        className="box-shadow-3"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        placeholder="your@email.com"
        type="email"
        required
      />
      <input
        className="box-shadow-3"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        placeholder="password"
        type="password"
        minLength={3}
        required
      />
      <div className="flex-row box-shadow-3">
        <button className="primary-btn" type="submit">
          login
        </button>
        <button
          className="secondary-btn nav-cancel-btn box-shadow-3"
          onClick={() => setLoginView("landing")}
          type="button"
        >
          cancel
        </button>
      </div>
    </form>
  );
};

export default NavLogin;
