import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light">
      <Container fluid className="d-flex justify-content-center">
        <span>
          virno website made <b>React.js</b>.
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
