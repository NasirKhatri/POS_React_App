import React from "react";
//import { Link, useLocation, Outlet } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from "react";
import { StoreContext } from "./App";

const NavigationBar = () => {
  const storeData = useContext(StoreContext);

  if (storeData.login) {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar">
        <Container>
          <Navbar.Brand href="/">CrispyChaska</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="http://localhost:3000/Sale">POS</Nav.Link>
              <NavDropdown title="SETUP" id="collasible-nav-dropdown">
                <NavDropdown.Item href="http://localhost:3000/Add_Customer">Add Customer</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="http://localhost:3000/Add_Item">Add Item</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="http://localhost:3000/Add_Category">Add Category</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="http://localhost:3000/Sale">LOGOUT</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
  else {
    return (
      <Navbar bg="dark" variant="dark" className="navbar">
        <Container>
          <Nav className="ml-auto">
            <Nav.Link href="http://localhost:3000/Signup">SIGN UP</Nav.Link>
            <Nav.Link href="http://localhost:3000/Login">LOGIN</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
  }


}

export default NavigationBar;