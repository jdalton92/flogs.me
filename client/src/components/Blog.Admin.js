import React, { useState, useContext } from "react";
import Context from "../context/Context";
import { useMutation } from "@apollo/client";
import { ADD_BLOG } from "../queries/blogQueries";
import { Divider } from "../styles/StyledComponents";
import "../styles/Blog.Add.css";

const BlogAdd = () => {
  const { setNotification, meData } = useContext(Context);
  const [variables, setForm] = useState({ tags: [] });
  const [tag, setTag] = useState("");
  const [
    addBlog,
    { error: addBlogError, loading: addBlogLoading },
  ] = useMutation(ADD_BLOG);

  const formHandler = (e) => {
    setForm({ ...variables, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addBlog({
        variables: {
          ...variables,
          authorId: meData.me._id,
        },
      });
      setNotification({
        type: "success",
        title: "ヽ(•‿•)ノ",
        message: "blog added",
      });
    } catch (e) {
      console.log(addBlogError);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
    }
  };

  const tagHandler = (e) => {
    e.preventDefault();
    setTag(e.target.value);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    setForm({
      ...variables,
      tags: [...variables.tags, tag],
    });
    setTag("");
  };

  return (
    <section className="w100 blog-add-section">
      <div className="w80 m-auto blog-add-wrapper">
        <div className="blog-add-header-wrapper">
          <h1>add blog</h1>
          <Divider width={"100%"} />
        </div>
        {addBlogLoading || addBlogError ? (
          <>
            {addBlogLoading && <div className="loader-spinner">loading...</div>}
            {addBlogError && <div>error deleting blog...</div>}
          </>
        ) : (
          <form className="w100 flex-col blog-add-form" onSubmit={handleSubmit}>
            <input
              className="blog-add-input"
              onChange={formHandler}
              type="text"
              name="title"
              placeholder="title"
              required
            />
            <input
              className="blog-add-input"
              onChange={formHandler}
              type="text"
              name="slug"
              placeholder="slug"
              required
            />
            <select
              className="blog-add-input"
              onChange={formHandler}
              name="category"
              defaultValue={""}
              required
            >
              <option value="" hidden disabled>
                choose a category...
              </option>
              <option value="money">money</option>
              <option value="lifestyle">lifestyle</option>
              <option value="other-shit">other shit</option>
            </select>
            <div className="flex-row blog-add-input blog-add-tags-wrapper">
              <input
                value={tag}
                onChange={tagHandler}
                type="text"
                name="tags"
                placeholder="add tag"
              />
              <button
                onClick={handleAddTag}
                type="button"
                className="secondary-btn blog-add-tags-btn"
              >
                add tag
              </button>
            </div>
            <div className="blog-add-input blog-add-tags-list">
              tags: {!variables.tags ? "none" : variables.tags.join(", ")}
            </div>
            <input
              className="blog-add-input"
              onChange={formHandler}
              type="url"
              name="img"
              placeholder="image url"
              required
            />
            <textarea
              className="blog-add-input"
              onChange={formHandler}
              type="text"
              name="content"
              placeholder="content"
              required
            />
            <button className="primary-btn" type="submit">
              add blog
            </button>
          </form>
        )}
      </div>
      <div className="w80 m-auto blog-delete-wrapper">
        <div className="blog-delete-header-wrapper">
          <h1>delete blog</h1>
          <Divider width={"100%"} />
        </div>
        {addBlogLoading || addBlogError ? (
          <>
            {addBlogLoading && <div className="loader-spinner">loading...</div>}
            {addBlogError && <div>error deleting blog...</div>}
          </>
        ) : (
          <form
            className="w100 flex-col blog-delete-form"
            onSubmit={handleSubmit}
          >
            <select
              className="blog-delete-input"
              onChange={formHandler}
              name="category"
              defaultValue={""}
              required
            >
              <option value="" hidden disabled>
                choose a category...
              </option>
              <option value="money">money</option>
              <option value="lifestyle">lifestyle</option>
              <option value="other-shit">other shit</option>
            </select>
            <button className="primary-btn" type="submit">
              delete blog
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default BlogAdd;
