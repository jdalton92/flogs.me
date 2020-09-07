import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Divider } from "../../styles/StyledComponents";

const BlogAdminBlogAction = ({
  header,
  blogData,
  blogLoading,
  blogError,
  blogsData,
  blogsLoading,
  blogsError,
  blogAction,
  blogActionLoading,
  blogActionError,
  multiSelectHandler,
}) => {
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const [variables, setBlogForm] = useState({
    title: "",
    slug: "",
    category: "",
    content: "",
    img: "",
    tags: [],
    similarBlogs: [],
  });
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  //Set default values for edit blog view
  useEffect(() => {
    if (blogData !== undefined && !blogLoading && !blogError) {
      setBlogForm({
        title: blogData.blogDetail.title,
        slug: blogData.blogDetail.slug,
        category: blogData.blogDetail.category,
        content: blogData.blogDetail.content,
        img: blogData.blogDetail.img,
      });
      setSimilarBlogs(blogData.blogDetail.similarBlogs.map((b) => b._id));
      setTags(
        blogData.blogDetail.tags.map((tag) => ({
          tag,
          _id: uuid(),
        }))
      );
    }
  }, [blogLoading, blogData, blogError]);

  //Handle blog action
  const blogFormHandler = (e) => {
    setBlogForm({ ...variables, [e.target.name]: e.target.value });
  };

  const tagHandler = (e) => {
    e.preventDefault();
    setTag(e.target.value);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    setTags([...tags, { tag, _id: uuid() }]);
    setTag("");
  };

  const handleRemoveTag = (id) => {
    const filterTags = tags.filter((t) => t._id !== id);
    setTags(filterTags);
    setTag("");
  };

  const similarBlogsHandler = (e) => {
    const value = multiSelectHandler(e);
    setSimilarBlogs(value);
  };

  const handleAction = (e) => {
    e.preventDefault();
    const tagsReduced = tags.map((t) => t.tag);
    blogAction({
      ...variables,
      tags: [...tagsReduced],
      similarBlogs,
    });
    setBlogForm({
      title: "",
      slug: "",
      category: "",
      content: "",
      img: "",
      tags: [],
      similarBlogs: [],
    });
    setTag("");
    setTags([]);
    setSimilarBlogs([]);
  };

  return (
    <div className="m-auto blog-action-wrapper">
      <div className="blog-action-header-wrapper">
        <h1>{header}</h1>
        <Divider width={"100%"} />
      </div>
      {blogActionLoading ||
      blogActionError ||
      blogsLoading ||
      blogsError ||
      blogsData === undefined ||
      blogLoading ||
      blogError ? (
        <>
          {(blogActionLoading ||
            blogsLoading ||
            blogLoading ||
            blogsData === undefined) && (
            <div className="loader-spinner">loading...</div>
          )}
          {(blogActionError || blogsError || blogError) && (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              error...
            </div>
          )}
        </>
      ) : (
        <form
          className="w100 flex-col blog-action-form"
          onSubmit={handleAction}
        >
          <input
            className="blog-action-input box-shadow-3"
            onChange={blogFormHandler}
            value={variables.title}
            type="text"
            name="title"
            placeholder="title"
            required
          />
          <input
            className="blog-action-input box-shadow-3"
            onChange={blogFormHandler}
            value={variables.slug}
            type="text"
            name="slug"
            placeholder="slug"
            required
          />
          <select
            className="blog-action-input box-shadow-3"
            onChange={blogFormHandler}
            value={variables.category}
            name="category"
            required
          >
            <option value="" hidden disabled>
              choose a category...
            </option>
            <option value="money">money</option>
            <option value="lifestyle">lifestyle</option>
            <option value="other-shit">other shit</option>
          </select>
          <div className="flex-row blog-action-input blog-action-tags-wrapper">
            <input
              className="box-shadow-3"
              value={tag}
              onChange={tagHandler}
              type="text"
              name="tags"
              placeholder="add tag"
            />
            <button
              onClick={handleAddTag}
              type="button"
              className="secondary-btn blog-action-tags-btn box-shadow-3"
            >
              add tag
            </button>
          </div>
          <div className="blog-action-input blog-action-tags-list-wrapper">
            tags:{" "}
            <span className="blog-action-tags-list">
              {tags.length === 0
                ? "none"
                : tags.map((t, i) => (
                    <div key={i} className="blog-action-tag">
                      {t.tag}
                      <div className="blog-action-delete-tag-wrapper">
                        <button
                          onClick={() => handleRemoveTag(t._id)}
                          type="button"
                          className="blog-action-tag-delete-btn box-shadow-3"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))}
            </span>
          </div>
          <input
            className="blog-action-input box-shadow-3"
            onChange={blogFormHandler}
            value={variables.img}
            type="url"
            name="img"
            placeholder="image url"
          />
          <textarea
            className="blog-action-input box-shadow-3"
            onChange={blogFormHandler}
            value={variables.content}
            type="text"
            name="content"
            placeholder="content"
            required
          />
          <div className="blog-action-caption">similar blogs</div>
          <select
            className="blog-action-input box-shadow-3"
            onChange={similarBlogsHandler}
            value={similarBlogs}
            name="similarBlogs"
            multiple
          >
            {blogsData.allBlogs.map((b, i) => (
              <option key={i} value={b._id}>
                title: {b.title} | author: {b.author.name} | date:{" "}
                {new Intl.DateTimeFormat("en-GB").format(b.date)}
              </option>
            ))}
          </select>
          <button className="primary-btn box-shadow-3" type="submit">
            {header.toLowerCase().includes("add") ? "add blog" : "update blog"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BlogAdminBlogAction;
