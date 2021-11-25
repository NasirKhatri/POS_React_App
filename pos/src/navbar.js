import React from "react";
//import { Link, useLocation, Outlet } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
          </Nav>
          {/*} <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
</Nav>*/}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar;