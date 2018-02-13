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
        <h3>
          Ever wish your instagram stories had a little more... permanance? Or
          were a bit more tactile?
        </h3>
        <p>Convert your short video to a flipbook</p>
        <Basic />
      </div>
    );
  }
}

export default App;
