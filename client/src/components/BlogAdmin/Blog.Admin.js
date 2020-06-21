import React, { useState, useEffect, useContext } from "react";
import Context from "../../context/Context";
import { useMutation, useLazyQuery } from "@apollo/client";
import {
  ALL_BLOGS,
  ADD_BLOG,
  DELETE_BLOGS,
  FEATURED_BLOGS,
  SET_FEATURE_BLOGS,
  GET_BLOG,
} from "../../queries/blogQueries";
import BlogAdminBlogAction from "./Blog.Admin.BlogAction";
import BlogAdminModal from "./Blog.Admin.Modal";
import { Divider } from "../../styles/StyledComponents";
import "../../styles/Blog.Admin.css";

const BlogAdmin = () => {
  const {
    setNotification,
    blogsSearch,
    blogsData,
    blogsLoading,
    blogsError,
    showEditBlogModal,
    setShowEditBlogModal,
  } = useContext(Context);
  const [editBlogSlug, setEditBlogSlug] = useState("");
  const [deletedBlogs, setDeletedBlogsForm] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [nonFeaturedBlogs, setNonFeaturedBlogs] = useState([]);
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
  const [
    getBlog,
    { data: blogData, error: blogError, loading: blogLoading },
  ] = useLazyQuery(GET_BLOG);

  useEffect(() => {
    blogsSearch({ variables: { all: true } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Handle multi select options
  const multiSelectHandler = (e) => {
    let options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    return value;
  };

  //Handle add blog
  const handleAddBlog = (variables) => {
    try {
      addBlog({
        variables,
        refetchQueries: [
          {
            query: ALL_BLOGS,
            variables: { all: true },
          },
        ],
        awaitRefetchQueries: true,
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

  //Handle edit blog
  const handleEditBlog = (e) => {
    e.preventDefault();
    if (!editBlogSlug) {
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "select blog to edit",
      });
    } else {
      getBlog({ variables: { slug: editBlogSlug } });
      setShowEditBlogModal(true);
    }
  };

  //Handle delete blogs
  const handleDeleteBlogs = (e) => {
    e.preventDefault();
    if (deletedBlogs.length === 0) {
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "select blog to delete",
      });
    } else {
      const confirm = window.confirm(`permanently delete blog? `);
      if (confirm) {
        try {
          deleteBlogs({
            variables: { blogId: deletedBlogs },
            refetchQueries: [
              {
                query: ALL_BLOGS,
                variables: { all: true },
              },
            ],
            awaitRefetchQueries: true,
          });
        } catch (e) {
          console.log(deleteBlogsError);
          setNotification({
            type: "fail",
            title: "¯\\_(ツ)_/¯",
            message: e.message,
          });
        }
      }
    }
  };

  //Handle featured blogs actions
  const featuredBlogsHandler = (e) => {
    const value = multiSelectHandler(e);
    setFeaturedBlogs(value);
  };

  const nonFeaturedBlogsHandler = (e) => {
    const value = multiSelectHandler(e);
    setNonFeaturedBlogs(value);
  };

  const setFeatured = (e) => {
    e.preventDefault();
    try {
      featureBlogs({
        variables: { blogId: [...nonFeaturedBlogs], type: "setFeatured" },
        refetchQueries: [
          {
            query: ALL_BLOGS,
            variables: { all: true },
          },
          {
            query: FEATURED_BLOGS,
            variables: { field: "featured", top: 5, order: "descending" },
          },
        ],
        awaitRefetchQueries: true,
      });
    } catch (e) {
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
        variables: { blogId: [...featuredBlogs], type: "setNonFeatured" },
        refetchQueries: [
          {
            query: ALL_BLOGS,
            variables: { all: true },
          },
          {
            query: FEATURED_BLOGS,
            variables: { field: "featured", top: 5, order: "descending" },
          },
        ],
        awaitRefetchQueries: true,
      });
    } catch (e) {
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
            {(blogsLoading ||
              featuredBlogsLoading ||
              blogsData === undefined) && (
              <div className="loader-spinner">loading...</div>
            )}
            {(blogsError || featuredBlogsError) && (
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                error updating blogs...
              </div>
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
                <button
                  onClick={setFeatured}
                  className="secondary-btn featured-list-update-btn"
                  type="button"
                >
                  {"feature >>"}
                </button>
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
                <button
                  onClick={setNonFeatured}
                  className="secondary-btn featured-list-update-btn"
                  type="button"
                >
                  {"<< unfeature"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <BlogAdminBlogAction
        header={"add blog"}
        blogsData={blogsData}
        blogsLoading={blogsLoading}
        blogsError={blogsError}
        blogAction={handleAddBlog}
        blogActionLoading={addBlogLoading}
        blogActionError={addBlogError}
        multiSelectHandler={multiSelectHandler}
      />
      <div className="m-auto blog-edit-wrapper">
        <div className="blog-delete-edit-wrapper">
          <h1>edit blog</h1>
          <Divider width={"100%"} />
        </div>
        {blogsLoading || blogsError || blogsData === undefined ? (
          <>
            {(blogsLoading || blogsData === undefined) && (
              <div className="loader-spinner">loading...</div>
            )}
            {blogsError && (
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                error loading blogs...
              </div>
            )}
          </>
        ) : (
          <form
            className="w100 flex-col blog-edit-form"
            onSubmit={handleEditBlog}
          >
            <select
              className="blog-edit-input"
              onChange={({ target }) => setEditBlogSlug(target.value)}
              defaultValue={"default"}
              name="category"
              required
            >
              <option value="default" disabled>
                select blog
              </option>
              {blogsData.allBlogs.map((b, i) => (
                <option key={i} value={b.slug}>
                  title: {b.title} | author: {b.author.name} | comments:{" "}
                  {b.comments.length} | date:{" "}
                  {new Intl.DateTimeFormat("en-GB").format(b.date)}
                </option>
              ))}
            </select>
            <button className="primary-btn" type="submit">
              edit blog
            </button>
          </form>
        )}
        <BlogAdminModal
          blogData={blogData}
          blogLoading={blogLoading}
          blogError={blogError}
          blogsData={blogsData}
          blogsLoading={blogsLoading}
          blogsError={blogsError}
          showModal={showEditBlogModal}
          setShowModal={setShowEditBlogModal}
          multiSelectHandler={multiSelectHandler}
        />
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
            {(blogsLoading ||
              deleteBlogsLoading ||
              blogsData === undefined) && (
              <div className="loader-spinner">loading...</div>
            )}
            {(blogsError || deleteBlogsError) && (
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                error deleting blog...
              </div>
            )}
          </>
        ) : (
          <form
            className="w100 flex-col blog-delete-form"
            onSubmit={handleDeleteBlogs}
          >
            <select
              className="blog-delete-input"
              onChange={({ target }) => setDeletedBlogsForm(target.value)}
              defaultValue={"default"}
              name="category"
              required
            >
              <option value="default" disabled>
                select blog
              </option>
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

export default BlogAdmin;
