import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ReactGA from "react-ga";
import Context from "./context/Context";

import ScrollToTop from "./utils/ScrollToTop";
import NoMatch from "./components/NoMatch";
import Notification from "./components/Notification";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home";
import Blogs from "./components/Blogs/Blogs";
import Blog from "./components/Blog/Blog";
import BlogAdmin from "./components/Blog.Admin";
// import Merch from "./components/Merch";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import User from "./components/User";
import Footer from "./components/Footer";

import "./styles/App.css";

const App = () => {
  const { meLoading, meData, meRefetch } = useContext(Context);

  //Init user on page render if logged in previously
  useEffect(() => {
    const existingToken = localStorage.getItem("flogsToken");
    if (existingToken) {
      meRefetch();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Google analytics
  ReactGA.initialize("UA-158975814-4");
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Notification />
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/search" render={() => <Blogs topic={"all"} />} />
          <Route exact path="/money" render={() => <Blogs topic={"money"} />} />
          <Route
            path="/lifestyle"
            render={() => <Blogs topic={"lifestyle"} />}
          />
          <Route
            path="/other-shit"
            render={() => <Blogs topic={"other-shit"} />}
          />
          <Route path="/blog/:slug" render={() => <Blog />} />
          {/* <Route path="/merch" render={() => <Merch />} /> */}
          <Route path="/contact" render={() => <Contact />} />
          <Route path="/faq" render={() => <FAQ />} />
          {!meLoading && meData.me !== null ? (
            <Route path="/blog-admin" render={() => <BlogAdmin />} />
          ) : (
            <Redirect to="/" />
          )}
          <Route path="/user/:id" render={() => <User />} />
          <Route render={() => <NoMatch />} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
