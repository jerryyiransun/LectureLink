import logo from "../../../assets/logo.png";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { auth } from "../../../firebase/config.js";
import { handleSignOut } from "../../api/firebasApi.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const NavBar = () => {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [auth]);

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
          <div className="text-white font-weight-bold mx-2 p-0 d-flex justify-content-center align-items-center">
            {auth?.currentUser
              ? `Logged in as ${auth.currentUser.email}`
              : "Not logged in"}
          </div>
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
            {auth?.currentUser ? "Sign Out" : "Sign In"}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};
