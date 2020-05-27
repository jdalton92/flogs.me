import React, { useState } from "react";
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
  const [variables, setBlogForm] = useState({ tags: [], similarBlogs: [] });
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  //Set default values for edit blog view
  if (blogData !== undefined && !blogLoading && !blogError) {
    console.log("blogDetails");
  }

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
    setTags([]);
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
      blogsData === undefined ? (
        <>
          {(blogActionLoading || blogsLoading || blogsData === undefined) && (
            <div className="loader-spinner">loading...</div>
          )}
          {(blogActionError || blogsError) && (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              error adding blog...
            </div>
          )}
        </>
      ) : (
        <form
          className="w100 flex-col blog-action-form"
          onSubmit={handleAction}
        >
          <input
            className="blog-action-input"
            onChange={blogFormHandler}
            type="text"
            name="title"
            placeholder="title"
            required
          />
          <input
            className="blog-action-input"
            onChange={blogFormHandler}
            type="text"
            name="slug"
            placeholder="slug"
            required
          />
          <select
            className="blog-action-input"
            onChange={blogFormHandler}
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
          <div className="flex-row blog-action-input blog-action-tags-wrapper">
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
              className="secondary-btn blog-action-tags-btn"
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
                          className="blog-action-tag-delete-btn"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))}
            </span>
          </div>
          <input
            className="blog-action-input"
            onChange={blogFormHandler}
            type="url"
            name="img"
            placeholder="image url"
          />
          <textarea
            className="blog-action-input"
            onChange={blogFormHandler}
            type="text"
            name="content"
            placeholder="content"
            required
          />
          <div className="blog-action-caption">similar blogs</div>
          <select
            className="blog-action-input"
            onChange={similarBlogsHandler}
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
          <button className="primary-btn" type="submit">
            add blog
          </button>
        </form>
      )}
    </div>
  );
};

export default BlogAdminBlogAction;
