import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactGA from "react-ga";

import ScrollToTop from "./utils/ScrollToTop";
import Notification from "./components/Notification";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
// import Lifestyle from "./components/Lifestyle";
// import OtherShit from "./components/OtherShit";
// import Merch from "./components/Merch";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

import "./styles/App.css";

const App = () => {
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
          <Route exact path="/money" render={() => <Blogs topic={"money"} />} />
          <Route
            path="/lifestyle"
            render={() => <Blogs topic={"lifestyle"} />}
          />
          <Route
            path="/other-shit"
            render={() => <Blogs topic={"other-shit"} />}
          />
          <Route path="/blog/:id" render={() => <Blog />} />
          {/* <Route path="/merch" render={() => <Merch />} /> */}
          <Route path="/contact" render={() => <Contact />} />
          <Route path="/FAQ" render={() => <FAQ />} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
