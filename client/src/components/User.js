import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../queries/userQueries";
import "../styles/User.css";

const User = () => {
  const id = useParams().id;
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

  const handleClick = (e) => {
    e.preventDefault();
    //TO DO
    console.log("to do");
  };

  console.log("userData", userData);

  let name;
  let createdDate;
  let blogs;
  let savedBlogs;
  let comments;
  let userType;

  if (!userError && !userLoading) {
    name = userData.userDetail.name;
    createdDate = new Intl.DateTimeFormat("en-GB").format(
      userData.userDetail.createdDate
    );
    blogs = userData.userDetail.blogs;
    savedBlogs = userData.userDetail.savedBlogs;
    comments = userData.userDetail.comments;
    userType = userData.userDetail.userType;
    console.log("name", name);
  }

  return (
    <section className="w100 h100 user-section">
      {userLoading || userError ? (
        <>
          {userLoading && <div className="loader-spinner">loading...</div>}
          {userError && <div>error loading user data...</div>}
        </>
      ) : (
        <div className="w100 user-profile-wrapper">
          <div className="user-header-wrapper">
            <div className="w100 user-name-wrapper">
              <h1>{name}</h1>
            </div>
            <div className="w100 user-subheader-wrapper">
              <div className="">
                member since: <b>{createdDate}</b>
              </div>
              <div>
                account type: <b>{userType}</b>
              </div>
              <div onClick={handleClick}>account settings</div>
            </div>
          </div>
          <div className="user-stats-wrapper">
            <div className="user-stat-wrapper box-shadow-on-hover">
              <h2>saved blogs</h2>
            </div>
            <div className="user-stat-wrapper box-shadow-on-hover">
              <h2>blogs written</h2>
            </div>
            <div className="user-stat-wrapper box-shadow-on-hover">
              <h2>comments</h2>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default User;
