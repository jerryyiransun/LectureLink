import logo from "../../../assets/logo.png";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { auth } from "../../../firebase/config.js";
import { handleSignOut } from "../../api/firebasApi.js";

export const NavBar = () => {
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      className="position-fixed w-100"
      style={{
        height: "74px",
        backgroundColor: "rgba(0, 32, 96, 0.9)",
        zIndex: 1000,
      }}
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "55px",
              width: "55px",
            }}
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/user-config">User Profile</Nav.Link>
          <Nav.Link href="/search">Search</Nav.Link>
        </Nav>
        <Nav>
          <Button
            variant="secondary"
            onClick={() => {
              if (auth.currentUser) {
                handleSignOut();
              } else {
                window.location.href = "/login";
              }
            }}
          >
            {auth.currentUser ? "Sign In" : "Sign Out"}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};
