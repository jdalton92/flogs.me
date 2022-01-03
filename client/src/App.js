import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Context from "./context/Context";

import CustomRoute from "./utils/CustomRoute";
import ScrollToTop from "./utils/ScrollToTop";

import DynamicTitle from "./utils/DynamicTitle";
import NoMatch from "./components/NoMatch";
import Notification from "./components/Notification";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home";
import Blogs from "./components/Blogs/Blogs";
import Blog from "./components/Blog/Blog";
import BlogAdmin from "./components/BlogAdmin/Blog.Admin";
import Tools from "./components/Tools/Tools";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import AccountSummary from "./components/Account.Summary";
import AccountSettings from "./components/Account.Settings";
import Footer from "./components/Footer";

import "./styles/main.scss";

const App = () => {
  const { meRefetch } = useContext(Context);

  useEffect(() => {
    const existingToken = localStorage.getItem("flogsToken");
    if (existingToken) {
      meRefetch();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            path="/technology"
            render={() => <Blogs topic={"technology"} />}
          />
          <Route path="/blog/:slug" render={() => <Blog />} />
          <Route exact path="/tools" render={() => <Tools />} />
          <Route path="/contact" render={() => <Contact />} />
          <Route path="/faq" render={() => <FAQ />} />
          <Route path="/user/:id" render={() => <AccountSummary />} />
          <CustomRoute path="/blog-admin" render={() => <BlogAdmin />} />
          <CustomRoute path="/settings" render={() => <AccountSettings />} />
          <Route render={() => <NoMatch />} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
