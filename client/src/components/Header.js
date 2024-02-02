// Header.js
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import './Header.css'

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container className='logo'>
          <Navbar.Brand href="#home">Dulcet</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;