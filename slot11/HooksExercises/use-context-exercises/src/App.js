import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import CounterComponent from "./components/CounterComponent";
import LightSwitch from "./components/LightSwitch";
import LoginForm from "./components/LoginForm";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Container className="py-4">
          <Row className="gy-4">
            <Col md={6}><CounterComponent /></Col>
            <Col md={6}><LightSwitch /></Col>
            <Col md={6}><LoginForm /></Col>
          </Row>
        </Container>
      </AuthProvider>
    </ThemeProvider>
  );
}
