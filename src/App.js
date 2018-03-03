import React, { Component } from "react";
import "./App.css";
import Basic from "./Basic";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Instaflip</h1>
        </header>
        <Basic />
      </div>
    );
  }
}

export default App;
