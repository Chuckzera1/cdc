import React, { Component } from 'react'
import './Author.css'
import './../App.css'
import NavBar from './NavBar.jsx'
import AuthorBox from './../components/AuthorRefact'
import './../css/pure-release-1.0.0/pure-min.css'

class Author extends Component {


  render() {

    return (
      <div id="main">
        <div className="header">
          <h1>Cadastro de autores</h1>
        </div>
        <div className="justify-content-center" id="content">
          <AuthorBox/>
        </div>
      </div>
    );
  }
}

export default Author;
