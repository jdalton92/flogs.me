import React, { useEffect, useState, useContext } from "react";
import Context from "../context/Context";
import { useParams } from "react-router-dom";
import FeaturedList from "./FeaturedList";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_USER,
  CHANGE_PASSWORD,
  CHANGE_EMAIL,
} from "../queries/userQueries";
import { Divider } from "../styles/StyledComponents";
import "../styles/User.css";

const User = () => {
  const id = useParams().id;
  const { setNotification } = useContext(Context);
  const [subscribe, setSubscribe] = useState(true);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [changeEmail, { error: changeEmailError }] = useMutation(CHANGE_EMAIL);
  const [changePassword, { error: changePasswordError }] = useMutation(
    CHANGE_PASSWORD
  );
  const {
    data: userData,
    error: userError,
    loading: userLoading,
    refetch: userRefetch,
  } = useQuery(GET_USER, {
    variables: { userId: id },
  });
  useEffect(() => {
    userRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // useEffect(() => {
  //   if (!userError && !userLoading) {
  //     setSubscribe(userData.userDetail.subscribed);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userLoading, userError]);

  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      const data = await changeEmail({
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
      localStorage.setItem("flogsToken", data.editEmail.value);
      setNotification({
        type: "success",
        title: "ヽ(•‿•)ノ",
        message: "email changed",
      });
      setNewEmail("");
    } catch (e) {
      console.log(changeEmailError);
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
      const data = await changePassword({
        variables: {
          password,
          newPassword,
        },
      });
      localStorage.setItem("flogsToken", data.editPassword.value);
      setNotification({
        type: "success",
        title: "ヽ(•‿•)ノ",
        message: "password changed",
      });
      setPassword("");
      setNewPassword("");
    } catch (e) {
      console.log(changePasswordError);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: changePasswordError,
      });
    }
  };

  let name;
  let email;
  let createdDate;
  let blogs;
  let savedBlogs;
  let comments;
  let userType;

  if (!userError && !userLoading) {
    name = userData.userDetail.name;
    email = userData.userDetail.email;
    createdDate = new Intl.DateTimeFormat("en-GB").format(
      userData.userDetail.createdDate
    );
    blogs = userData.userDetail.blogs;
    savedBlogs = userData.userDetail.savedBlogs;
    comments = userData.userDetail.comments;
    userType = userData.userDetail.userType;
  }

  // TO DO
  // ONLY SHOW SETTINGS IF CURRENT USER LOGGED IN

  return (
    <section className="w100 h100 user-section flex-col-center">
      {userLoading || userError ? (
        <>
          {userLoading && <div className="loader-spinner">loading...</div>}
          {userError && <div>error loading user data...</div>}
        </>
      ) : (
        <>
          <div className="user-summary-wrapper">
            <div className="user-header-wrapper">
              <h1>account summary</h1>
              <Divider width={"100%"} />
            </div>
            <div className="user-body-wrapper">
              <div className="w100 user-subheader-wrapper">
                <div>
                  <h2>{name}</h2>
                </div>
                <div>
                  member since: <b>{createdDate}</b>
                </div>
                <div>
                  account type: <b>{userType}</b>
                </div>
                <div>
                  total blogs: <b>{blogs.length}</b>
                </div>
                <div>
                  total comments: <b>{comments.length}</b>
                </div>
              </div>
              <div className="featured-lists-wrapper">
                <FeaturedList title={"saved blogs"} />
                <FeaturedList title={"blogs written"} />
                <FeaturedList title={"comments"} />
              </div>
            </div>
          </div>
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
                    {subscribe ? "on" : "off"}
                  </span>
                  <label className="user-unsubscribe-switch">
                    <input
                      onClick={() => setSubscribe(!subscribe)}
                      value={subscribe}
                      type="checkbox"
                    />
                    <span className="user-unsubscribe-slider" />
                  </label>
                </div>
              </div>
              <div className="user-settings-item">
                <h2>change email</h2>
                <form onSubmit={handleEmailChange}>
                  <input value={email} type="email" disabled />
                  <input
                    value={newEmail}
                    onChange={({ target }) => setNewEmail(target.value)}
                    placeholder="new@email.com"
                    type="email"
                    minLength={3}
                    required
                  />
                  <button type="submit" className="primary-btn">
                    submit
                  </button>
                </form>
              </div>
              <div className="user-settings-item">
                <h2>change password</h2>
                <form onSubmit={handlePasswordChange}>
                  <input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    placeholder="old password"
                    type="password"
                    minLength={3}
                    required
                  />
                  <input
                    value={newPassword}
                    onChange={({ target }) => setNewPassword(target.value)}
                    placeholder="new password"
                    type="password"
                    minLength={3}
                    required
                  />
                  <button type="submit" className="primary-btn">
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

export default User;
