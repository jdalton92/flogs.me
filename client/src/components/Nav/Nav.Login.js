import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../queries/userQueries";
import Context from "../../context/Context";

const NavLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setLoginView, setNotification } = useContext(Context);

  const [
    login,
    { loading: loginLoading, error: loginError, data: loginData }
  ] = useMutation(LOGIN);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: {
          email,
          password
        }
      });
      setToken(data.login.value);
      localStorage.setItem("flogsToken", data.login.value);
      setLoginView("landing");
    } catch (e) {
      console.log(e);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message
      });
      setEmail("");
      setPassword("");
    }
  };

  if (loginLoading) {
    return (
      <div className="login-wrapper loading-wrapper">
        <div className="loader-spinner">loading...</div>
      </div>
    );
  }

  return (
    <form className="nav-login-form" onSubmit={handleLogin}>
      <input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        placeholder="your@email.com"
        type="email"
        required
      />
      <input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        placeholder="password"
        type="password"
        minLength={3}
        required
      />
      <div className="flex-row">
        <button className="primary-btn" type="submit">
          login
        </button>
        <button
          className="secondary-btn nav-cancel-btn"
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
