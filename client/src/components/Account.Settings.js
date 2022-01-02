import React, { useState, useContext } from "react";
import Context from "../context/Context";
import { useMutation } from "@apollo/client";
import {
  GET_USER,
  CHANGE_SUBSCRIPTION,
  CHANGE_PASSWORD,
  CHANGE_EMAIL,
} from "../queries/userQueries";
import { Divider } from "../styles/styled/StyledComponents";

const AccountSettings = () => {
  const { setNotification, meData, meLoading, meError } = useContext(Context);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [changeEmail, { error: changeEmailError }] = useMutation(CHANGE_EMAIL);
  const [changePassword, { error: changePasswordError }] =
    useMutation(CHANGE_PASSWORD);
  const [changeSubscription, { error: changeSubscriptionError }] =
    useMutation(CHANGE_SUBSCRIPTION);

  let email, id, subscribed;
  if (!meLoading && !meError && meData !== undefined) {
    email = meData.getMe.email;
    id = meData.getMe._id;
    subscribed = meData.getMe.subscribed;
  }

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await changeSubscription({
        variables: {
          subscribe: !subscribed,
        },
        refetchQueries: [
          {
            query: GET_USER,
            variables: { userId: id },
          },
        ],
        awaitRefetchQueries: true,
      });
      setNotification({
        type: "success",
        title: "ヽ(•‿•)ノ",
        message: "subscription updated",
      });
    } catch (e) {
      console.log(e);
      console.log(changeSubscriptionError);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      const { data } = await changeEmail({
        variables: {
          newEmail,
        },
        refetchQueries: [
          {
            query: GET_USER,
            variables: { userId: id },
          },
        ],
        awaitRefetchQueries: true,
      });
      localStorage.setItem("flogsToken", data.updateUserEmail.value);
      setNotification({
        type: "success",
        title: "ヽ(•‿•)ノ",
        message: "email changed",
      });
      setNewEmail("");
    } catch (e) {
      console.log(changeEmailError);
      console.log(e);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: changeEmailError,
      });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const { data } = await changePassword({
        variables: {
          password,
          newPassword,
        },
      });
      localStorage.setItem("flogsToken", data.updateUserPassword.value);
      setNotification({
        type: "success",
        title: "ヽ(•‿•)ノ",
        message: "password changed",
      });
      setPassword("");
      setNewPassword("");
    } catch (e) {
      console.log(e);
      console.log(changePasswordError);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
    }
  };

  return (
    <section className="w100 h100 user-section flex-col-center">
      {meLoading || meError || meData === undefined ? (
        <>
          {meLoading && <div className="loader-spinner">loading...</div>}
          {meError && <div>error loading user data...</div>}
        </>
      ) : (
        <>
          <div className="user-settings-wrapper">
            <div className="user-header-wrapper">
              <h1>account settings</h1>
              <Divider width={"100%"} />
            </div>
            <div className="user-body-wrapper">
              <div className="user-settings-item">
                <h2>subscribe to be notified of updates</h2>
                <div className="user-subscribe-wrapper flex-row">
                  <span className="user-subscribe-label">
                    {subscribed ? "on" : "off"}
                  </span>
                  <label className="user-unsubscribe-switch">
                    <input
                      onChange={handleSubscribe}
                      checked={subscribed}
                      type="checkbox"
                    />
                    <span className="user-unsubscribe-slider" />
                  </label>
                </div>
              </div>
              <div className="user-settings-item">
                <h2>change email</h2>
                <form onSubmit={handleEmailChange}>
                  <input
                    className="box-shadow-3"
                    value={email}
                    type="email"
                    disabled
                  />
                  <input
                    className="box-shadow-3"
                    value={newEmail}
                    onChange={({ target }) => setNewEmail(target.value)}
                    placeholder="new@email.com"
                    type="email"
                    minLength={3}
                    required
                  />
                  <button type="submit" className="primary-btn box-shadow-3">
                    submit
                  </button>
                </form>
              </div>
              <div className="user-settings-item">
                <h2>change password</h2>
                <form onSubmit={handlePasswordChange}>
                  <input
                    className="box-shadow-3"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    placeholder="old password"
                    type="password"
                    minLength={3}
                    required
                  />
                  <input
                    className="box-shadow-3"
                    value={newPassword}
                    onChange={({ target }) => setNewPassword(target.value)}
                    placeholder="new password"
                    type="password"
                    minLength={3}
                    required
                  />
                  <button type="submit" className="primary-btn box-shadow-3">
                    submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default AccountSettings;
