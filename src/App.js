import React, { Component } from 'react';
import './App.css';
import NavBar from './Templates/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
      <NavBar/>
          <div id="main">
            {this.props.children}
          </div>
        </div>
        </div>
    );
  }
}

export default App;
