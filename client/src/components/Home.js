import React from "react";
import { useQuery } from "@apollo/client";
import { FEATURED_BLOGS } from "../queries/blogQueries";
import flogs from "../styles/images/flogs.jpg";
import unhappy from "../styles/images/unhappy-stick-figure.png";
import happy from "../styles/images/happy-stick-figure.png";
import FeaturedList from "./FeaturedList.js";
import { Divider } from "../styles/StyledComponents";
import "../styles/Home.css";

const Home = () => {
  const {
    data: commentBlogData,
    error: commentBlogError,
    loading: commentBlogLoading,
  } = useQuery(FEATURED_BLOGS, {
    variables: { field: "comments.length", top: 5, order: "descending" },
  });
  const {
    data: recentBlogData,
    error: recentBlogError,
    loading: recentBlogLoading,
  } = useQuery(FEATURED_BLOGS, {
    variables: { field: "date", top: 5, order: "descending" },
  });

  const {
    data: featuredBlogData,
    error: featuredBlogError,
    loading: featuredBlogLoading,
  } = useQuery(FEATURED_BLOGS, {
    variables: { field: "featured", top: 5, order: "descending" },
  });

  return (
    <section className="w100 h100 home-section">
      <div className="w100 home-slogan-wrapper flex-row">
        <div className="home-slogan-left">
          <h1>flogs.me</h1>
          <h3>for when you got nothin' else going on</h3>
        </div>
        <div className="home-slogan-right">
          <img alt="flogs.me" src={flogs} className="home-slogan-img" />
        </div>
      </div>
      <div className="featured-lists-wrapper">
        <FeaturedList
          title={"featured blogs"}
          dataObject={featuredBlogData}
          error={featuredBlogError}
          loading={featuredBlogLoading}
        />
        <FeaturedList
          title={"most commented blogs"}
          dataObject={commentBlogData}
          error={commentBlogError}
          loading={commentBlogLoading}
        />
        <FeaturedList
          title={"most recent blogs"}
          dataObject={recentBlogData}
          error={recentBlogError}
          loading={recentBlogLoading}
        />
      </div>
      <div className="h100 home-img-wrapper">
        <div className="h100 home-img-left">
          <h2>you before flogs.me</h2>
          <img alt="unhappy" src={unhappy} className="home-img-unhappy" />
        </div>
        <div className="h100 home-img-right">
          <h2>you after flogs.me</h2>
          <img alt="unhappy" src={happy} className="home-img-happy" />
        </div>
      </div>
      <Divider width={"15%"} thickness={"5px"} />
      <div className="flex-row-center w100 home-caption-wrapper">
        <h2 className="w100 home-caption">sign up now.</h2>
      </div>
      <Divider width={"15%"} thickness={"5px"} />
    </section>
  );
};

export default Home;
