import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Axios from 'axios';
import msg from 'messages.js';
class Login extends React.Component {
  state = {

    email: "",
    password: "",
    apiurl: "user/login",
  };

  componentDidMount() {
    const { history } = this.props;
    if (
      localStorage.getItem("token") !== null && localStorage.getItem('token') !== "" && localStorage.getItem("userobj") !== null && localStorage.getItem('userobj') !== "") {
      history.push('/dashboard');
    }

  }
  handlechange = event => {



    this.setState({ [event.target.name]: event.target.value });

  };

  handlelogin = () => {
    Axios.post(`${process.env.REACT_APP_Api}${this.state.apiurl}/`, {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        if (response.status === 200) {
          alert(msg.loginsuccess);
          console.log(response);
          localStorage.setItem('userobj', JSON.stringify(response.data.user));

          localStorage.setItem('token', response.data.token);
          window.location.reload();

          // return <Redirect from="/" to="/dashboard" />;
        }


      })
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          //place your reentry code
          alert(msg.loginfailed);
        }
        else {
          alert(msg.servererror);

        }

      });

  }
  render() {
    const { email, password } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    {/* <Form> */}
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="email" type="text" placeholder="Email" onChange={this.handlechange} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="password" type="password" placeholder="Password" onChange={this.handlechange} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" onClick={this.handlelogin} className="px-4">Login</Button>
                      </Col>
                      {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
                    </Row>
                    {/* </Form> */}
                  </CardBody>
                </Card>
                {
                  /* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
