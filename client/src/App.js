import React from "react";
import Notification from "./components/Notification";
import Nav from "./components/Nav";
import Body from "./components/Body";
import Footer from "./components/Footer";
import "./styles/App.css";

const App = () => {
  return (
    <>
      <Notification />
      <Nav />
      <Body />
      <Footer />
    </>
  );
};

export default App;
