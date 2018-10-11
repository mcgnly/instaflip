import React, { Component } from "react";
import "./App.css";
import Basic from "./Basic";

class App extends Component {
  state = {
    view:'main'
  }
  render() {
    return (
      <div className="App">
        <header className="App-header" onClick={() => this.setState({view:'main'})}>
          <h1 className="App-title">Instaflip</h1>
        </header>
        <Basic view={this.state.view}/>
      </div>
    );
  }
}

export default App;
