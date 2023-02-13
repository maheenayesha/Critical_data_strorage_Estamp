import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormInput, Button } from '../reusable/ReusableComponents';
import * as reactbts from 'react-bootstrap';

// import './Loginstyle.css';
import axios from 'axios';
export default class LoginPage extends React.Component {
    state = {
        inputobj: {
            Email: "",
            password: ""
        }, apiurl: "user/login",

        errors: {},
        submitted: false
    };

    handleChange = event => {
        const { inputobj } = this.state;
        inputobj[event.target.name] = event.target.value;
        this.setState({ inputobj });
    };

    onSubmit = () => {
        const {
            inputobj: { Email, password }
        } = this.state;
        let err = {};

        if (!Email) {
            err.Email = "Enter your Email!";
        }

        // if (password.length < 8) {
        //     err.password = "Password must be at least 8 characters!";
        // }

        this.setState({ errors: err }, () => {
            if (Object.getOwnPropertyNames(this.state.errors).length === 0) {
                // NO Error

                axios.post(`${process.env.REACT_APP_Api}${this.state.apiurl}/`, {
                    email: Email,
                    password: password
                })
                    .then(response => {
                        if (response.status == 200) {
                            alert("Login Successfully");
                            console.log(response);
                            localStorage.setItem('token', response.data.token);

                        }


                    })
                    .catch(function (error) {

                        alert("Login Failed");
                    });





            }
        });
    };
    handleSubmit = () => {

    }
    render() {
        const {
            submitted,
            errors,
            inputobj: { Email, password }
        } = this.state;
        return (
            <React.Fragment>
                {submitted ? (
                    <div>
                        <p>Welcome onboard, {Email}!</p>
                        <p>Token, {localStorage.getItem('token')}!</p>
                    </div>
                ) : (
                        <React.Fragment>
                            <h3>Login!</h3>


                            <FormInput
                                label="Email"
                                name="Email"
                                type="text"
                                value={Email}
                                onChange={this.handleChange}
                                placeholder="Enter Email..."
                                error={errors.Email}
                                required
                                className="input"
                            />

                            <FormInput
                                label="Password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={this.handleChange}
                                placeholder="Enter password..."
                                error={errors.password}
                                className="input"
                                required
                            />

                            <Button
                                type="submit"
                                label="Submit"
                                variant="outline-primary"
                                handleClick={this.onSubmit}
                            />



                        </React.Fragment>
                    )}
            </React.Fragment>
        );
    }
}