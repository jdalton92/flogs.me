import React from "react";
import BlogCard from "./Blog.Card.js";
import SignUp from "./SignUp.js";
import "../styles/Blogs.css";

import { blogs } from "../utils/sampleBlogs";

const Blogs = ({ topic }) => {
  blogs.map(b => (b.category = topic));

  console.log(blogs);

  return (
    <section className="blogs-section flex-row">
      <div className="content-wrapper flex-3">
        {blogs.map(b => (
          <BlogCard key={b._id} blog={b} />
        ))}
      </div>
      <div className="signup-wrapper flex-1">
        <SignUp />
      </div>
    </section>
  );
};

export default Blogs;
