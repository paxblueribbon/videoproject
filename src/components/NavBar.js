import React from "react";
import { Collapse, Container, Nav, Navbar, NavItem, NavLink } from 'reactstrap';

class NavBar extends React.Component {

    render() {
    return (
        <Navbar expand light class="bg-white">
        <Container fluid>
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>
          <Collapse navbar id="navbarExample01">
            <Nav class="me-auto mb-2 mb-lg-0">
              <NavItem active>
                <NavLink aria-current="page" href="#">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Features</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    ) }
}

export default NavBar