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
import DynamicTitle from "./utils/DynamicTitle";
import NoMatch from "./components/NoMatch";
import Notification from "./components/Notification";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home";
import Blogs from "./components/Blogs/Blogs";
import Blog from "./components/Blog/Blog";
import BlogAdmin from "./components/Blog.Admin";
import Tools from "./components/Tools/Tools";
// import Merch from "./components/Merch";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import AccountSummary from "./components/Account.Summary";
import AccountSettings from "./components/Account.Settings";
import Footer from "./components/Footer";

import "./styles/App.css";

const App = () => {
  const { meError, meLoading, meData, meRefetch } = useContext(Context);
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
  if (process.env.NODE_ENV === "production") {
    ReactGA.initialize("UA-158975814-4");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  return (
    <>
      <Router>
        <DynamicTitle />
        <ScrollToTop />
        <Notification />
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/blogs" render={() => <Blogs topic={null} />} />
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
          <Route exact path="/tools" render={() => <Tools />} />
          {/* <Route path="/merch" render={() => <Merch />} /> */}
          <Route path="/contact" render={() => <Contact />} />
          <Route path="/faq" render={() => <FAQ />} />
          <Route path="/user/:id" render={() => <AccountSummary />} />
          {!meError && !meLoading && meData.me !== null ? (
            <>
              <Route path="/blog-admin" render={() => <BlogAdmin />} />
              <Route path="/settings" render={() => <AccountSettings />} />
            </>
          ) : (
            <Redirect to="/" />
          )}
          <Route render={() => <NoMatch />} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
