import React from "react";
import Search from "./Search";
import BlogsCard from "./Blogs.Card.js";
import SignUp from "./SignUp.js";
import "../styles/Blogs.css";

import { blogs } from "../utils/blogs";

const Blogs = ({ topic }) => {
  blogs.map(b => b.category === topic);

  return (
    <section className="blogs-section flex-row">
      <div className="flex-col flex-3 blogs-left-col-wrapper">
        <Search topic={{ topic }} />
        <div className="blogs-wrapper">
          {blogs.map(b => (
            <BlogsCard key={b._id} blog={b} />
          ))}
        </div>
      </div>
      <div className="blogs-right-col-wrapper flex-1">
        <SignUp type={"blogs"} />
      </div>
    </section>
  );
};

export default Blogs;
