import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../queries/userQueries";
import FeaturedList from "./FeaturedList";
import { Divider } from "../styles/StyledComponents";
import "../styles/User.css";

const AccountSummary = () => {
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

  let userComments,
    userBlogs,
    userSavedBlogs,
    name,
    createdDate,
    blogs,
    comments,
    userType;

  if (!userError && !userLoading && userData !== undefined) {
    name = userData.userDetail.name;
    createdDate = new Intl.DateTimeFormat("en-GB").format(
      userData.userDetail.createdDate
    );
    blogs = userData.userDetail.blogs;
    comments = userData.userDetail.comments;
    userType = userData.userDetail.userType;
    userComments = { comments: userData.userDetail.comments };
    userBlogs = { blogs: userData.userDetail.blogs };
    userSavedBlogs = { blogs: userData.userDetail.savedBlogs };
  }

  return (
    <section className="w100 h100 user-section flex-col-center">
      {userLoading || userError ? (
        <>
          {userLoading && <div className="loader-spinner">loading...</div>}
          {userError && <div>error loading user data...</div>}
        </>
      ) : (
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
              <FeaturedList
                title={"saved blogs"}
                dataObject={userSavedBlogs}
                loading={userLoading}
                error={userError}
              />
              <FeaturedList
                title={"blogs written"}
                dataObject={userBlogs}
                loading={userLoading}
                error={userError}
              />
              <FeaturedList
                title={"comments"}
                dataObject={userComments}
                loading={userLoading}
                error={userError}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AccountSummary;
