import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import { useMutation } from "@apollo/client";
import {
  ADD_BLOG,
  DELETE_BLOGS,
  SET_FEATURE_BLOGS,
} from "../queries/blogQueries";
import { Divider } from "../styles/StyledComponents";
import "../styles/Blog.Admin.css";

const BlogAdd = () => {
  const {
    setNotification,
    meData,
    blogsSearch,
    blogsData,
    blogsLoading,
    blogsError,
  } = useContext(Context);
  const [deletedBlogs, setDeletedBlogsForm] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [nonFeaturedBlogs, setNonFeaturedBlogs] = useState([]);
  const [variables, setAddBlogForm] = useState({ tags: [] });
  const [tag, setTag] = useState("");
  const [
    addBlog,
    { error: addBlogError, loading: addBlogLoading },
  ] = useMutation(ADD_BLOG);
  const [
    deleteBlogs,
    { error: deleteBlogsError, loading: deleteBlogsLoading },
  ] = useMutation(DELETE_BLOGS);
  const [
    featureBlogs,
    { error: featuredBlogsError, loading: featuredBlogsLoading },
  ] = useMutation(SET_FEATURE_BLOGS);

  useEffect(() => {
    blogsSearch({ variables: { all: "" } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Handle add blog
  const addBlogFormHandler = (e) => {
    setAddBlogForm({ ...variables, [e.target.name]: e.target.value });
  };

  const tagHandler = (e) => {
    e.preventDefault();
    setTag(e.target.value);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    setAddBlogForm({
      ...variables,
      tags: [...variables.tags, tag],
    });
    setTag("");
  };

  const handleAddBlog = (e) => {
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

  //Handle delete blogs
  const deleteBlogsFormHandler = (e) => {
    setDeletedBlogsForm([...deletedBlogs, e.target.value]);
  };

  const handleDeleteBlogs = (e) => {
    e.preventDefault();
    const confirm = window.confirm(`delete ${deleteBlogs.length} blog(s)? `);
    if (confirm) {
      try {
        deleteBlogs({ variables: { blogID: [...deletedBlogs] } });
      } catch (e) {
        console.log(deleteBlogsError);
        setNotification({
          type: "fail",
          title: "¯\\_(ツ)_/¯",
          message: e.message,
        });
      }
    }
  };

  //Handle featured blogs actions
  const featuredBlogsHandler = (e) => {
    let options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFeaturedBlogs(value);
  };

  const nonFeaturedBlogsHandler = (e) => {
    let options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setNonFeaturedBlogs(value);
  };

  const setFeatured = (e) => {
    e.preventDefault();
    try {
      featureBlogs({
        variables: { blogID: [...nonFeaturedBlogs], type: "setFeatured" },
      });
      // TO DO -> UPDATE STATE IN FORM TO REFLECT NEW FEATURED/NON FEATURED BLOGS
      // blogsSearch({ variables: { all: "" } });
    } catch (e) {
      console.log(e);
      console.log(featuredBlogsError);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
    }
  };

  const setNonFeatured = (e) => {
    e.preventDefault();
    try {
      featureBlogs({
        variables: { blogID: [...featuredBlogs], type: "setNonFeatured" },
      });
      // TO DO -> UPDATE STATE IN FORM TO REFLECT NEW FEATURED/NON FEATURED BLOGS
      // blogsSearch({ variables: { all: "" } });
    } catch (e) {
      console.log(e);
      console.log(featuredBlogsError);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
    }
  };

  return (
    <section className="w100 blog-admin-section">
      <div className="m-auto blog-featured-wrapper">
        <div className="blog-featured-header-wrapper">
          <h1>set featured blogs</h1>
          <Divider width={"100%"} />
        </div>
        {blogsLoading ||
        blogsError ||
        blogsData === undefined ||
        featuredBlogsError ||
        featuredBlogsLoading ? (
          <>
            {(blogsLoading || featuredBlogsLoading) && (
              <div className="loader-spinner">loading...</div>
            )}
            {(blogsError || featuredBlogsError) && (
              <div>error updating blogs...</div>
            )}
          </>
        ) : (
          <form className="w100 flex-col blog-featured-form">
            <div className="blog-featured-lists">
              <div className="blog-featured-list">
                <h2>blogs</h2>
                <select
                  className="blog-featured-input"
                  onChange={nonFeaturedBlogsHandler}
                  name="non-featured-blogs"
                  multiple
                  required
                >
                  {blogsData.allBlogs
                    .filter((b) => !b.featured)
                    .map((b, i) => (
                      <option key={i} value={b._id}>
                        title: {b.title} | author: {b.author.name} | date:{" "}
                        {new Intl.DateTimeFormat("en-GB").format(b.date)}
                      </option>
                    ))}
                </select>
              </div>
              <div className="blog-featured-list">
                <h2>featured blogs</h2>
                <select
                  className="blog-featured-input"
                  onChange={featuredBlogsHandler}
                  name="featured-blogs"
                  multiple
                  required
                >
                  {blogsData.allBlogs
                    .filter((b) => b.featured)
                    .map((b, i) => (
                      <option key={i} value={b._id}>
                        title: {b.title} | author: {b.author.name} | date:{" "}
                        {new Intl.DateTimeFormat("en-GB").format(b.date)}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex-row">
              <div className="flex-row blog-featured-list-col align-end">
                <button
                  onClick={setFeatured}
                  className="secondary-btn featured-list-update-btn"
                  type="button"
                >
                  {">>"}
                </button>
              </div>
              <div className="blog-featured-list-col align-start">
                <button
                  onClick={setNonFeatured}
                  className="secondary-btn featured-list-update-btn"
                  type="button"
                >
                  {"<<"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="m-auto blog-add-wrapper">
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
          <form
            className="w100 flex-col blog-add-form"
            onSubmit={handleAddBlog}
          >
            <input
              className="blog-add-input"
              onChange={addBlogFormHandler}
              type="text"
              name="title"
              placeholder="title"
              required
            />
            <input
              className="blog-add-input"
              onChange={addBlogFormHandler}
              type="text"
              name="slug"
              placeholder="slug"
              required
            />
            <select
              className="blog-add-input"
              onChange={addBlogFormHandler}
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
              onChange={addBlogFormHandler}
              type="url"
              name="img"
              placeholder="image url"
              required
            />
            <textarea
              className="blog-add-input"
              onChange={addBlogFormHandler}
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
      <div className="m-auto blog-delete-wrapper">
        <div className="blog-delete-header-wrapper">
          <h1>delete blog</h1>
          <Divider width={"100%"} />
        </div>
        {blogsLoading ||
        blogsError ||
        blogsData === undefined ||
        deleteBlogsError ||
        deleteBlogsLoading ? (
          <>
            {(blogsLoading || deleteBlogsLoading) && (
              <div className="loader-spinner">loading...</div>
            )}
            {(blogsError || deleteBlogsError) && (
              <div>error deleting blog...</div>
            )}
          </>
        ) : (
          <form
            className="w100 flex-col blog-delete-form"
            onSubmit={handleDeleteBlogs}
          >
            <select
              className="blog-delete-input"
              onChange={deleteBlogsFormHandler}
              name="category"
              multiple
              required
            >
              {blogsData.allBlogs.map((b, i) => (
                <option key={i} value={b._id}>
                  title: {b.title} | author: {b.author.name} | comments:{" "}
                  {b.comments.length} | date:{" "}
                  {new Intl.DateTimeFormat("en-GB").format(b.date)}
                </option>
              ))}
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
