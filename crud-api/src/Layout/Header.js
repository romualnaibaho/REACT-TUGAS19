import React, { Component } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

class Header extends Component {

    render(){
        return (
            <div>
              <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#">CRUD API</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#">Features</Nav.Link>
                        <Nav.Link href="#">Detail</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            </div>
        );
    }
}

export default Header;
