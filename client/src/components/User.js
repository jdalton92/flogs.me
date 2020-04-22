import React, { useEffect } from "react";
import UserSettings from "./User.Settings";
import UserSummary from "./User.Summary";
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

  // TO DO
  // ONLY SHOW SETTINGS IF CURRENT USER LOGGED IN
  // Data parsed for format used in featured lists

  return (
    <section className="w100 h100 user-section flex-col-center">
      {userLoading || userError ? (
        <>
          {userLoading && <div className="loader-spinner">loading...</div>}
          {userError && <div>error loading user data...</div>}
        </>
      ) : (
        <>
          <UserSettings id={id} />
          <UserSummary
            userData={userData}
            userError={userError}
            userLoading={userLoading}
          />
        </>
      )}
    </section>
  );
};

export default User;
