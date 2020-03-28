import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Notification from "./components/Notification";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import "./styles/App.css";

const App = () => {
  return (
    <>
      <Router>
        <Notification />
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/contact" render={() => <Contact />} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
