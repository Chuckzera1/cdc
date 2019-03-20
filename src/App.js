import React, { Component } from 'react';
import Nav from './Templates/navBar'
import Main from './Templates/Main'
import Author from './Templates/Author'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Nav />
          <Main />
          <Author />
      </div>
    );
  }
}

export default App;
