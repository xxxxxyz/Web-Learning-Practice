import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header";
import NewsList from "./components/News_list";

import "./styles/styles.css";
import JSON from "./db.json";

const container = document.getElementById("app");
const root = createRoot(container);

class App extends Component {
  constructor() {
    super();

    this.state = {
      news: JSON,
      footerText: "I am the main footer",
      filtered: [],
    };
  }

  render() {
    return (
      <>
        <Header />
        <NewsList />
      </>
    );
  }
}

root.render(<App />);
