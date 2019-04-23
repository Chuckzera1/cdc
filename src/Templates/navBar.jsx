import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
//import Author from './Author'
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './navBar.css'

export default (props) => {
  return (

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Biblioteca</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Menu" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/"> Home</NavDropdown.Item>
              <NavDropdown.Item href="/autor"> Autores </NavDropdown.Item>
              <NavDropdown.Item href="/"> Livros </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  )
}