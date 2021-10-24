import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../queries/userQueries";
import Context from "../../context/Context";

const NavLogin = () => {
  const { meRefetch, setLoginView, setNotification } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUser, { loading: createUserLoading }] = useMutation(CREATE_USER);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUser({
        variables: {
          name,
          email,
          password,
        },
      });
      localStorage.setItem("flogsToken", data.createUser.value);
      meRefetch();
      setLoginView("landing");
      setNotification({
        type: "success",
        title: "ヽ(•‿•)ノ",
        message: "account created",
      });
    } catch (e) {
      console.log(e);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  if (createUserLoading) {
    return <div className="loader-spinner loading-wrapper">loading...</div>;
  }

  return (
    <form className="nav-signup-form" onSubmit={handleSignUp}>
      <input
        className="box-shadow-3"
        value={name}
        onChange={({ target }) => setName(target.value)}
        placeholder="full name"
        type="text"
        required
      />
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
      <div className="flex-row">
        <button className="primary-btn box-shadow-3" type="submit">
          sign up
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
