
// Navbar.js
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAlerts } from '../redux/actions'; // Import the toggleAlerts action
import logo from '../resources/logo.png';
import '../style/navbar.css';

function NavBar() {
  const alertsEnabled = useSelector((state) => state.alertsEnabled);
  const dispatch = useDispatch();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/dash">
          <img
            src={logo}
            alt="Logo"
            width="250"
            height="95"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '300px' }} navbarScroll>
           
            <Nav.Link href="/DDOSPage">DOS</Nav.Link>
            <Nav.Link href="/DNSPage">DNS</Nav.Link>
            <Nav.Link href="/DNSExPage">DNS Exfiltration</Nav.Link>
            <Nav.Link href="/EncryptedPage">Encrypted Attack</Nav.Link>
            <Nav.Link href="/AnomalyPage">Anomaly Attack</Nav.Link>
            <Nav.Link href="/MitrePage">Mitre Attack </Nav.Link>
            <Nav.Link href="/LateralPage">Lateral Movement </Nav.Link>
            <Nav.Link href="/Ransom">Ransomware </Nav.Link>
            
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="me-2">
              Search
            </Button>
            <Button variant="outline-danger" onClick={() => handleLogout()}>
              Logout
            </Button>

            {/* Toggle button for turning alerts on/off */}
            <Button
              variant={alertsEnabled ? 'success' : 'danger'}
              onClick={() => dispatch(toggleAlerts())} className='mx-2'
            >
              {alertsEnabled ? 'Alerts On' : 'Alerts Off'}
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// Dummy function for handling logout (replace with actual logout logic)
const handleLogout = () => {
  console.log('Logout clicked');
};

export default NavBar;
