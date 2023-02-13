import React, { Component } from 'react';
import {

    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    CardFooter

} from 'reactstrap';
import Axios from "axios";
import msg from 'messages.js';
class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            fadeIn: true,
            timeout: 300,
            email: "",
            password: "",
            apiurl: "user/signup",
            readp: true,
            writep: true,
            authorizep: false,
            userp: false
        };
    }



    handlechange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log('user state', this.state);

    };
    handlechangecheckbox = event => {

        this.setState({ [event.target.name]: event.target.checked });
        console.log('user state', this.state);

    };
    handlesubmission = () => {
        Axios.post(`${process.env.REACT_APP_Api}${this.state.apiurl}/`, {
            email: this.state.email,
            password: this.state.password,
            readPermission: this.state.writep === true || this.state.authorizep === true ? true : this.state.readp,
            writePermission: this.state.writep,
            authorizePermission: this.state.authorizep,
            usersCreationPermission: this.state.userp
        })
            .then(response => {
                if (response.status === 201) {
                    alert(msg.signupsuccess);
                    console.log(response);

                }


            })
            .catch(function (error) {
                if (error.response && error.response.status === 409) {
                    //place your reentry code
                    alert(msg.signupfailed);
                }
                else {
                    alert(msg.servererror);

                }

            });

    }
    render() {
        const {

            email,
            password,
            readp,
            writep,
            authorizep,
            userp
        } = this.state;
        console.log(this.state);
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong>Create User</strong>
                                <small> Form</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="email">Email</Label>
                                            <Input type="text" id="email" name="email" placeholder="Enter Email" onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="password">Password</Label>
                                            <Input type="password" id="password" name="password" placeholder="Enter Password" onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Permissions</Label>
                                    </Col>
                                    <Col md="9">
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="readdata" name="readp"
                                                checked={this.state.readp}
                                                onChange={this.handlechangecheckbox} />
                                            <Label className="form-check-label" check htmlFor="readdata">Read Data</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="writedata" name="writep" checked={writep} onChange={this.handlechangecheckbox} />
                                            <Label className="form-check-label" check htmlFor="writedata">Write Data</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="Authorize" name="authorizep" onChange={this.handlechangecheckbox} />
                                            <Label className="form-check-label" check htmlFor="Authorize">Authorize</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="Users" name="userp" onChange={this.handlechangecheckbox} />
                                            <Label className="form-check-label" check htmlFor="Users">Users </Label>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary" onClick={this.handlesubmission}><i className="fa fa-dot-circle-o"></i> Create</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateUser;
