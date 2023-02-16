import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { firebaseAuthentication, googleProvider } from "../config/firebase";

import "bootstrap/dist/css/bootstrap.min.css";

export default class Registrasi extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChangeField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    firebaseAuthentication
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebaseAuthentication.currentUser
          .sendEmailVerification()
          .then(() => {
            alert("Mohon verifikasi email anda");
            firebaseAuthentication.signOut();
            this.props.history.push("/login");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  handleLoginWithGoogle = () => {
    firebaseAuthentication
      .signInWithPopup(googleProvider)
      .then(() => {
        this.props.history.push("/home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs="12" md="8" lg="4">
            <h2>Sign Up</h2>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={this.handleChangeField}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={this.handleChangeField}
                  required
                />
              </FormGroup>
              <Button color="primary" block>
                Sign Up
              </Button>
            </Form>
            <Button
              onClick={this.handleLoginWithGoogle}
              outline
              color="secondary"
              block
              style={{ marginTop: 20, marginBottom: 20}}
            >
              Login With Google
            </Button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
