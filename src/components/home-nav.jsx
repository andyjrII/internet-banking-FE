import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo192.png';
import './components.css';

function HomeNavigation() {
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand href="/" id='brandlogo'>
                <img alt="Logo" src={logo} width="30" height="30" className="d-inline-block align-top" />{'SMC Bank'}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/register" className="nav-menu">Register</Nav.Link>
                    <Nav.Link href="/create-account" className="nav-menu">Open Account</Nav.Link>
                    <Nav.Link href="/transfer" className="nav-menu">Send Money</Nav.Link>
                    <Nav.Link href="/airtime" className="nav-menu">Airtime Topup</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#contact" className="nav-menu">Contact Us</Nav.Link>
                    <Nav.Link href="#about" className="nav-menu">About Us</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default HomeNavigation;