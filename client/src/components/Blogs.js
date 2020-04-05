import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BLOGS } from "../queries/blogQueries";
import Search from "./Search";
import BlogsCard from "./Blogs.Card";
import "../styles/Blogs.css";

const Blogs = ({ topic }) => {
  const { data, error, loading, refetch } = useQuery(ALL_BLOGS, {
    variables: { category: topic }
  });

  useEffect(() => {
    refetch();
  }, [topic]);

  // const updateCacheWith = addedComment => {
  //   const includedIn = (set, object) =>
  //     set.map(c => c._id).includes(object._id);

  //   const dataInStore = client.readQuery({ query: ALL_BLOGS });
  //   if (!includedIn(dataInStore.allBooks, addedBook)) {
  //     client.writeQuery({
  //       query: ALL_BOOKS,
  //       data: { allBooks: dataInStore.allBooks.concat(addedBook) }
  //     });
  //   }
  // };

  // useSubscription(COMMENT_ADDED, {
  //   onSubscriptionData: ({ subscriptionData }) => {
  //     const comment = subscriptionData.data.commentAdded;
  //     updateCacheWith(comment);
  //   }
  // });

  return (
    <section className="blogs-section flex-row">
      <div className="flex-col m-auto w80">
        <Search topic={{ topic }} />
        <div className="blogs-wrapper">
          {loading ? (
            <div className="loader-spinner">loading...</div>
          ) : (
            <>
              {data.allBlogs.length === 0 && (
                <div style={{ paddingTop: "25px" }}>coming soon...</div>
              )}
              {error && <div style={{ paddingTop: "25px" }}>error...</div>}
              {data.allBlogs.length > 0 &&
                !error &&
                data.allBlogs.map(b => <BlogsCard key={b._id} blog={b} />)}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
