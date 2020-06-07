import React, { useContext, useEffect, useCallback } from "react";
import BlogAdminBlogAction from "./Blog.Admin.BlogAction";
import Context from "../../context/Context";
import { useMutation } from "@apollo/client";
import { ALL_BLOGS, EDIT_BLOG, GET_BLOG } from "../../queries/blogQueries";

const BlogAdminModal = ({
  showModal,
  setShowModal,
  blogData,
  blogError,
  blogLoading,
  blogsData,
  blogsError,
  blogsLoading,
  multiSelectHandler,
}) => {
  const { setNotification } = useContext(Context);
  const [
    editBlog,
    { error: editBlogError, loading: editBlogLoading },
  ] = useMutation(EDIT_BLOG);

  //Close modal if esc key pressed
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setShowModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditBlog = (variables) => {
    console.log(variables);
    try {
      editBlog({
        variables: { ...variables, _id: blogData.blogDetail._id },
        refetchQueries: [
          {
            query: ALL_BLOGS,
            variables: { all: true },
          },
          {
            query: GET_BLOG,
            variables: { slug: variables.slug },
          },
        ],
        awaitRefetchQueries: true,
      });
      setNotification({
        type: "success",
        title: "ヽ(•‿•)ノ",
        message: "blog updated",
      });
      setShowModal(false);
    } catch (e) {
      console.log(editBlogError);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
    }
  };

  if (!showModal) {
    return null;
  }
  return (
    <div className="blog-admin-overlay">
      <div className="blog-admin-modal">
        <div className="blog-admin-close">
          <span onClick={() => setShowModal(false)}>x</span>
        </div>
        <BlogAdminBlogAction
          header={"edit blog"}
          blogsData={blogsData}
          blogsLoading={blogsLoading}
          blogsError={blogsError}
          blogData={blogData}
          blogLoading={blogLoading}
          blogError={blogError}
          blogAction={handleEditBlog}
          blogActionLoading={editBlogLoading}
          blogActionError={editBlogError}
          multiSelectHandler={multiSelectHandler}
        />
      </div>
    </div>
  );
};

export default BlogAdminModal;
