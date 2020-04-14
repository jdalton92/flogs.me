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

  return (
    <section className="w100 h100 user-section">
      <div className="w100 user-description-wrapper">USER PAGE</div>
    </section>
  );
};

export default User;
