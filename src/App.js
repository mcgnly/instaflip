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
        <h3 className='description'>
          Convert your instagram story into a flipbook. In case that's something you've always wanted to do.
        </h3>
        
        <Basic />
      </div>
    );
  }
}

export default App;
