import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BLOG } from "../queries/blogQueries";
import BlogComments from "./Blog.Comments";
import BlogAddComment from "./Blog.AddComment";
import { useParams } from "react-router-dom";

const Blog = () => {
  const id = useParams().id;
  const { data, error, loading, refetch } = useQuery(GET_BLOG, {
    variables: { blogId: id }
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  let title;
  let category;
  let date;
  let author = { name: "" };
  let comments;
  let tags;
  let content;
  let img;

  if (!loading && !error) {
    title = data.blogDetail.title;
    category = data.blogDetail.category;
    date = new Intl.DateTimeFormat("en-GB").format(data.blogDetail.date);
    author = data.blogDetail.author;
    comments = data.blogDetail.comments;
    tags = data.blogDetail.tags;
    content = data.blogDetail.content;
    img = data.blogDetail.img;
  }

  return (
    <section className="blog-section w100 h100">
      <div className="flex-col-center blog-wrapper">
        {loading ? (
          <div className="loader-spinner">loading...</div>
        ) : (
          <>
            <div className="blog-header-wrapper">
              <h2 className="blog-title">{title}</h2>
              <div className="m-auto blog-details">
                <span>
                  posted to: <b>{category}</b> |{" "}
                </span>
                <span>
                  posted on: <b>{date}</b> |{" "}
                </span>
                <span>
                  posted by: <b>{author.name}</b> |{" "}
                </span>
                <span>
                  with:{" "}
                  <b>
                    {comments.length}{" "}
                    {comments.length === 1 ? "comment" : "comments"}
                  </b>{" "}
                  |{" "}
                </span>
                <span>
                  {tags.length > 0 ? (
                    <>
                      tags: <b>{tags.join(", ")}</b>
                    </>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="w80 flex-col blog-body-wrapper">
              {img ? (
                <div className="w100 blog-body-image-wrapper">
                  <img className="blog-body-image" alt="img" src={img} />
                </div>
              ) : null}
              <div
                className="w100 flex-row blog-body-content"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </div>
            <div className="blog-comments-wrapper">
              <BlogAddComment id={id} />
              <BlogComments comments={comments} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
