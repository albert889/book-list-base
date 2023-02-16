import React, { Component } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { firebaseAuthentication } from "../config/firebase";

import "bootstrap/dist/css/bootstrap.min.css";

export default class ForgotPassword extends Component {
  state = {
    email: "",
  };
  handleChangeField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    firebaseAuthentication
      .sendPasswordResetEmail(email, firebaseAuthentication)
      .then(() => {
        alert("Silahkan periksa email anda untuk mengubah password");
        this.props.history.push("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  render() {
    const { email } = this.state;
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs="12" md="8" lg="4">
            <h2>Reset Password</h2>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.handleChangeField}
                  value={email}
                  required
                />
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                block
                style={{ marginTop: 20, marginBottom: 20 }}
              >
                Send Request
              </Button>
            </Form>
            <p>
              Don't have an account? <Link to="/registrasi">Sign Up</Link>
            </p>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
